import math


def get_height_and_width():
    while True:
        height = input("Enter height:\n")
        width = input("Enter width :\n")
        if height.isdigit() and width.isdigit():
            height = int(height)
            width = int(width)
            # Tower height must be greater than or equal to 2
            if height >= 2 and width > 0:  # Correct input is guaranteed
                return height, width
        print("invalid values\n")


def rectangular():  # Rectangular
    height, width = get_height_and_width()
    if height == width or abs(height - width) > 5:
        print("The area of the rectangle is: ", height*width)
    else:
        print("The perimeter of the rectangle is: ", height*2 + width*2)


def print_triangle(width, height):
    # remove the first line and the last line
    num_of_inside_lines = height - 2
    # How many jumps of odd numbers are there in the triangle (between the width of the triangle and the number 1)
    # Jump is defined as a reduction of 2 at a time, reduce 1 for the result because the width is odd number
    num_of_jumps_of_odd_numbers = (width // 2) - 1
    # how many lines to print for each line
    num_of_prints_for_current_line = num_of_inside_lines // num_of_jumps_of_odd_numbers
    # how many times to print the second line (always has 3 stars)
    remained_lines_to_print = num_of_inside_lines % num_of_jumps_of_odd_numbers

    for i in range(1, height + 1):  # Print 'height' lines, 'i' is the number of the current line (1...height)
        spaces = " " * (height - i)
        stars = "*" * (2 * i - 1)  # Reduce 1 to get an odd number of stars
        if len(stars) > width:  # The last line must contain num of stars equal to the width
            break
        if 1 < len(stars) < width:
            for j in range(num_of_prints_for_current_line):
                print(spaces + stars)
            # The top group Contains additional rows according to the remainder of the division.
            if len(stars) == 3:
                for j in range(remained_lines_to_print):
                    print(spaces + stars)
        else:
            # The first and the last lines must be prints only ones
            print(spaces + stars)


def triangle():  # Triangle
    height, width = get_height_and_width()
    while True:
        option = input("Enter you choice: 1 for calculate the scope of the triangle, 2 for print the triangle:\n")
        if option.isdigit():
            option = int(option)
            if option == 1:
                # Isosceles triangle
                leg = math.sqrt(math.pow(height, 2) + math.pow(width/2, 2))
                print("The perimeter of the triangle is: ", width + leg*2)
                break
            elif option == 2:
                if width % 2 == 0 or width > height*2:
                    print("The triangle cannot be printed")
                    break
                elif width % 2 != 0 and width < height*2:
                    print_triangle(width, height)
                    break
            else:
                print("Error: Input must be a number (1, 2):")
        else:
            print("Error: Input must be a number (1, 2):")


def default():
    print("Invalid option")


if __name__ == "__main__":

    options = {
        1: rectangular,
        2: triangle,
    }
    order = "Enter your choice: 1 for rectangular tower, 2 for triangle tower, 3 for Exit\n"
    while True:
        choice = input(order)
        if choice.isdigit():
            choice = int(choice)
            if choice == 3:
                break
            options.get(choice, default)()
        else:
            print("Error: Input must be a number (1, 2, 3):")

    print("Exit")

