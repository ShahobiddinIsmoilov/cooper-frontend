def add_value_to_nested_dict(d, target_key, new_key, new_value):
    """
    Function to add a new key-value pair to a specified child dictionary within a nested dictionary.

    Args:
    - d: The nested dictionary to traverse.
    - target_key: The key of the child dictionary where the new key-value pair should be added.
    - new_key: The key of the new key-value pair to add.
    - new_value: The value of the new key-value pair to add.

    Returns:
    - True if the target_key is found and the new key-value pair is added successfully, False otherwise.
    """
    if isinstance(d, dict):
        if target_key in d:
            d[target_key][new_key] = new_value
            return True
        else:
            for value in d.values():
                if add_value_to_nested_dict(value, target_key, new_key, new_value):
                    return True
    return False

# Example nested dictionary
nested_dict = {
    'a': {
        'b': {
            'c': 1,
            'd': 2
        },
        'e': [3, 4, {'f': 5}]
    },
    'g': {
        'h': 6
    }
}

# Add a new key-value pair ('new_key': 'new_value') to the child dictionary with key 'b' within the nested dictionary
if add_value_to_nested_dict(nested_dict, 'b', 'new_key', 'new_value'):
    print("New key-value pair added successfully:")
    print(nested_dict)
else:
    print("Target key not found.")
