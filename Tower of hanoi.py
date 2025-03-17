import pygame
import sys

# Initialize Pygame
pygame.init()

# Constants
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
DISK_HEIGHT = 20
BASE_WIDTH = 200
POLE_WIDTH = 20

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
DISK_COLORS = [
    (255, 0, 0),    # Red
    (0, 255, 0),    # Green
    (0, 0, 255),    # Blue
    (255, 255, 0),  # Yellow
    (255, 0, 255),  # Magenta
    (0, 255, 255),  # Cyan
    (128, 0, 0),    # Maroon
]

class TowerOfHanoi:
    def __init__(self, num_disks):
        self.num_disks = num_disks
        self.towers = {
            'A': list(range(num_disks, 0, -1)),
            'B': [],
            'C': []
        }
        self.selected_tower = None
        self.moves = 0
        
        # Setup display
        self.screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
        pygame.display.set_caption("Tower of Hanoi")
        self.font = pygame.font.Font(None, 36)

    def draw_disk(self, disk_size, x, y):
        width = (disk_size * 30) + 40
        color = DISK_COLORS[disk_size - 1 % len(DISK_COLORS)]
        rect = pygame.Rect(x - width//2, y - DISK_HEIGHT//2, width, DISK_HEIGHT)
        pygame.draw.rect(self.screen, color, rect, border_radius=5)
        pygame.draw.rect(self.screen, BLACK, rect, 2, border_radius=5)

    def draw_pole(self, x):
        # Draw pole
        pygame.draw.rect(self.screen, BLACK, 
                        (x - POLE_WIDTH//2, 200, POLE_WIDTH, 300))
        # Draw base
        pygame.draw.rect(self.screen, BLACK, 
                        (x - BASE_WIDTH//2, 500, BASE_WIDTH, 20))

    def draw(self):
        self.screen.fill(WHITE)
        pole_positions = {
            'A': WINDOW_WIDTH // 4,
            'B': WINDOW_WIDTH // 2,
            'C': 3 * WINDOW_WIDTH // 4
        }

        # Draw poles
        for x in pole_positions.values():
            self.draw_pole(x)

        # Draw disks
        for tower_name, tower_pos in pole_positions.items():
            for i, disk in enumerate(self.towers[tower_name]):
                y_pos = 480 - (i * DISK_HEIGHT)
                self.draw_disk(disk, tower_pos, y_pos)

        # Draw labels and move counter
        for tower_name, x in pole_positions.items():
            label = self.font.render(tower_name, True, BLACK)
            self.screen.blit(label, (x - 10, 530))

        moves_text = self.font.render(f"Moves: {self.moves}", True, BLACK)
        self.screen.blit(moves_text, (10, 10))

        if self.is_complete():
            win_text = self.font.render("Congratulations! You Won!", True, (0, 128, 0))
            self.screen.blit(win_text, (WINDOW_WIDTH//2 - 150, 50))

        pygame.display.flip()

    def is_valid_move(self, from_tower, to_tower):
        if not self.towers[from_tower]:
            return False
        if not self.towers[to_tower]:
            return True
        return self.towers[from_tower][-1] < self.towers[to_tower][-1]

    def make_move(self, from_tower, to_tower):
        if self.is_valid_move(from_tower, to_tower):
            disk = self.towers[from_tower].pop()
            self.towers[to_tower].append(disk)
            self.moves += 1
            return True
        return False

    def is_complete(self):
        return len(self.towers['C']) == self.num_disks

    def get_tower_at_pos(self, pos):
        x = pos[0]
        if x < WINDOW_WIDTH//3:
            return 'A'
        elif x < 2*WINDOW_WIDTH//3:
            return 'B'
        else:
            return 'C'

def main():
    print("\nWelcome to Tower of Hanoi!")
    print("Click on source tower and then destination tower to move disks.")
    print("The goal is to move all disks from Tower A to Tower C.")
    print("Rules:")
    print("1. Move only one disk at a time")
    print("2. A larger disk cannot be placed on top of a smaller disk\n")

    num_disks = int(input("Enter number of disks (3-7 recommended): "))
    game = TowerOfHanoi(num_disks)
    
    while True:
        game.draw()
        
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
                
            if event.type == pygame.MOUSEBUTTONDOWN:
                clicked_tower = game.get_tower_at_pos(pygame.mouse.get_pos())
                
                if game.selected_tower is None:
                    game.selected_tower = clicked_tower
                else:
                    if game.make_move(game.selected_tower, clicked_tower):
                        if game.is_complete():
                            print(f"\nCongratulations! You solved it in {game.moves} moves!")
                            print(f"Minimum possible moves: {2**num_disks - 1}")
                    game.selected_tower = None

        pygame.time.wait(30)

if __name__ == "__main__":
    main()