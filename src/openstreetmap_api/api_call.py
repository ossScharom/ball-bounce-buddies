import json
import overpy


def fetch_sport_locations(sport, city="Leipzig"):
    """Fetches the locations of a given sport in a given city from OpenStreetMap and saves them as a JSON file.

    Args:
        sport (str): The sport to fetch the locations of.
        city (str, optional): The city to fetch the locations from. Defaults to "Leipzig".

    Returns:
        None
    """
    api = overpy.Overpass()

    query = f"""
        [out:json];
        area["name"="{city}"]["boundary"="administrative"];
        node(area)["sport"="{sport}"];
        out body;
    """

    result = api.query(query)

    node_dict = {}

    for node in result.nodes:
        node_tags = node.tags
        node_lat = str(node.lat)
        node_lon = str(node.lon)

        node_dict[node.id] = {"tags": node_tags, "lat": node_lat, "lon": node_lon}

    filename = f"./data/{city}_{sport}_locations.json"
    with open(filename, "w") as fp:
        json.dump(node_dict, fp, indent=4)


def main():
    fetch_sport_locations("table_tennis")
    fetch_sport_locations("basketball")
    fetch_sport_locations("chess")
    fetch_sport_locations("skateboard")


if __name__ == "__main__":
    main()
