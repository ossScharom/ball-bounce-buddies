import pytest
from geopy.distance import geodesic
from test_post import similar_requests
from itertools import combinations

def test_similar_requests():
    # Test data
    locations = [
        (51.3397, 12.3731),  # Leipzig, Germany
        (51.3400, 12.3735),  # Very close to the above location
        (51.3444, 12.3877),  # Still close to the above locations
        (40.7128, -74.0060),  # New York, USA
    ]
    error = 2  # km

    close_requests, similar_locations = similar_requests(locations, error)

    assert close_requests == 3

    expected_locations = set(locations[:3])
    assert similar_locations == expected_locations

    for loc1, loc2 in combinations(similar_locations, 2):
        assert geodesic(loc1, loc2).km <= error

