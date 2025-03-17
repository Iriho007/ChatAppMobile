def department_list():
    print('Are you the Head of IT? Reply with Y if yes and N if not.')
    response = input().strip()

    if response == 'N':
        return 'You must be the Head of IT to proceed.'
    elif response != 'Y':
        return 'Wrong choice. Please enter Y or N.'

    # If the user is the Head of IT, allow name entry
    members = []
    while True:
        user_input = input("Enter a name of IT members (or press Enter to finish): ")
        if user_input == "":
            break
        members.append(user_input.strip())

    if not members:
        return ""  # Return an empty string for an empty list
    elif len(members) == 1:
        return members[0]  # Return the single item as is
    else:
        return " ".join(members[:-1]) + " and " + members[-1]  # Join with spaces and 'and' before the last item

# Print the formatted output
print(department_list())
