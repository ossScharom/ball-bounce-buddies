import osmapi
from dotenv import load_dotenv
import os
import sqlite3
from geopy.distance import geodesic
from itertools import combinations
from math import radians, degrees, sin, cos, atan2, sqrt

load_dotenv()
username = os.getenv("OSM_USERNAME")
password = os.getenv("OSM_PASSWORD")


def similar_requests(location, error):
    """
    Takes a list of locations and checks how many of them are within a certain distance of each other, and returns the similar locations.

    Args:
        location (list): A list of locations.
        error (float): The maximum distance between two locations to be considered similar.

    Returns:
        similar_locations (set): A set of locations that are similar.
    """
    locations = []

    for loc1, loc2 in combinations(location, 2):
        # gedesic distance between two locations
        distance = geodesic(loc1, loc2).km
        # print(f"Distance between {loc1} and {loc2} is {distance} km")

        if distance <= error:
            locations.extend([loc1, loc2])

    # Remove duplicates
    similar_locations = set(locations)
    # print(f"Similar locations: {similar_locations}")

    return similar_locations


def geographic_center(locations):
    """
    Compute the geographic center (average) of a list of (latitude, longitude) coordinates.

    Args:
        locations (list): A list of tuples, where each tuple contains a latitude and a longitude.

    Returns:
        center (tuple): A tuple containing the latitude and longitude of the geographic center.
    """
    x_sum = 0
    y_sum = 0
    z_sum = 0

    for loc in locations:
        lat, lon = map(radians, loc)  # Convert to radians
        x_sum += cos(lat) * cos(lon)
        y_sum += cos(lat) * sin(lon)
        z_sum += sin(lat)

    x_avg = x_sum / len(locations)
    y_avg = y_sum / len(locations)
    z_avg = z_sum / len(locations)

    lon_center = atan2(y_avg, x_avg)
    hyp = sqrt(x_avg**2 + y_avg**2)
    lat_center = atan2(z_avg, hyp)

    return degrees(lat_center), degrees(lon_center)  # Convert back to degrees


def main():
    # variables
    tag = "table_tennis"
    error = 0.5  # km

    # connect to the database
    conn = sqlite3.connect("database.db")

    # query the database with the tag
    cur = conn.cursor()
    cur.execute(
        "SELECT latitude, longitude FROM location_requests WHERE tag = ?", (tag,)
    )
    data = cur.fetchall()

    # find similar locations
    similar_locations = similar_requests(data, error)

    # the geographic center of the similar locations
    center = geographic_center(similar_locations)

    # API
    api = osmapi.OsmApi(
        api="https://api.openstreetmap.org", username=username, password=password
    )

    # Open a new changeset
    api.ChangesetCreate({"comment": "Adding a new {tag} node".format(tag=tag)})

    # Prepare the new node
    new_node = {
        "lon": center[1],
        "lat": center[0],
        "tag": {
            "sport": "{tag}".format(tag=tag),
            # add more tags as necessary
        },
    }

    # Create the new node
    result = api.NodeCreate(new_node)
    print(result)

    # Close the changeset
    api.ChangesetClose()

    # close the connection


if __name__ == "__main__":
    main()
