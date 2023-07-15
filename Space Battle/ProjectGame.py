# 2-player space battle game created using pygame
# green player moves using aswd keys and shoots using left-ctrl key.
# blue player moves using arrow keys and shoots using right-ctrl key.
 
import pygame
import os
pygame.font.init()

FPS=60
VEL=5
BULLET_VEL=10
MAX_BULLETS=3
WIDTH,HEIGHT=900,500

GREEN_HIT=pygame.USEREVENT+1
BLUE_HIT=pygame.USEREVENT+2

WIN= pygame.display.set_mode((WIDTH,HEIGHT))
pygame.display.set_caption("Space Battle")

RED=(255,0,100)
WHITE=(255,255,255)
BLACK=(0,0,0)
GR=(0,255,0)
BL=(0,0,255)
HEALTH_FONT=pygame.font.SysFont('calibri',30)
WINNER_FONT=pygame.font.SysFont('impact',100)
BORDER=pygame.Rect(WIDTH//2-5,0,3,HEIGHT)

GREEN_SPACESHIP=pygame.image.load(os.path.join('Space Battle/assets','green-500.png'))
GREEN=pygame.transform.scale(GREEN_SPACESHIP,(80,80))
GREEN=pygame.transform.rotate(GREEN,-90)
BLUE_SPACESHIP=pygame.image.load(os.path.join('Space Battle/assets','blue-500.png'))
BLUE=pygame.transform.scale(BLUE_SPACESHIP,(80,80))
BLUE=pygame.transform.rotate(BLUE,90)
SPACE=pygame.transform.scale(pygame.image.load(os.path.join('Space Battle/assets','space.png')),(WIDTH,HEIGHT))

def draw(green,blue,green_bullets,blue_bullets,green_health,blue_health):
    WIN.blit(SPACE,(0,0))
    pygame.draw.rect(WIN,RED,BORDER)
    
    green_health_text=HEALTH_FONT.render("Health: "+str(green_health),1,WHITE)
    blue_health_text=HEALTH_FONT.render("Health: "+str(blue_health),1,WHITE)
    WIN.blit(blue_health_text,(WIDTH - blue_health_text.get_width()-10,10))
    WIN.blit(green_health_text,(10,10))
    
    WIN.blit(GREEN,(green.x,green.y))
    WIN.blit(BLUE,(blue.x,blue.y))
    
    for bullet in green_bullets:
        pygame.draw.rect(WIN,GR,bullet)
        
    for bullet in blue_bullets:
        pygame.draw.rect(WIN,BL,bullet)
    
    pygame.display.update()
    
def green_movements(keys_pressed,green):
        if keys_pressed[pygame.K_a] and green.x-VEL>0: #left
            green.x-=VEL
        if keys_pressed[pygame.K_d] and green.x+VEL+green.width<BORDER.x: #right
            green.x+=VEL
        if keys_pressed[pygame.K_w] and green.y-VEL>0: #up
            green.y-=VEL
        if keys_pressed[pygame.K_s] and green.y+VEL+green.height<HEIGHT: #down
            green.y+=VEL

def blue_movements(keys_pressed,blue):
        if keys_pressed[pygame.K_LEFT] and blue.x-VEL>BORDER.x+BORDER.width: #left
            blue.x-=VEL
        if keys_pressed[pygame.K_RIGHT] and blue.x+VEL+blue.width<WIDTH: #right
            blue.x+=VEL
        if keys_pressed[pygame.K_UP] and blue.y-VEL>0: #up
            blue.y-=VEL
        if keys_pressed[pygame.K_DOWN] and blue.y+VEL+blue.height<HEIGHT: #down
            blue.y+=VEL

def handle_bullets(green_bullets,blue_bullets,green,blue):
    for bullet in green_bullets:
        bullet.x+=BULLET_VEL
        if blue.colliderect(bullet):
            pygame.event.post(pygame.event.Event(BLUE_HIT))
            green_bullets.remove(bullet)
        elif bullet.x>WIDTH:
            green_bullets.remove(bullet)
            
            
    for bullet in blue_bullets:
        bullet.x-=BULLET_VEL
        if green.colliderect(bullet):
            pygame.event.post(pygame.event.Event(GREEN_HIT))
            blue_bullets.remove(bullet)
        elif bullet.x<0:
            blue_bullets.remove(bullet)

def draw_winner(text):
    draw_text=WINNER_FONT.render(text,1,WHITE)
    WIN.blit(draw_text,(WIDTH/2-draw_text.get_width()/2,HEIGHT/2-draw_text.get_height()/2))
    pygame.display.update()
    pygame.time.delay(5000)

def main():
    green=pygame.Rect(25,300,80,80)
    blue=pygame.Rect(800,300,80,80)
    green_bullets=[]
    blue_bullets=[]
    green_health=5
    blue_health=5
    
    clock=pygame.time.Clock()
    run=True
    while run:
        clock.tick(FPS)
        for event in pygame.event.get():
            if event.type==pygame.QUIT:
                run=False
                pygame.quit()
            if event.type==pygame.KEYDOWN:
                if event.key==pygame.K_LCTRL and len(green_bullets)< MAX_BULLETS:
                    bullet=pygame.Rect(green.x+green.width,green.y+green.height//2-2,10,5)
                    green_bullets.append(bullet)
                    
                if event.key==pygame.K_RCTRL and len(blue_bullets)< MAX_BULLETS:
                    bullet=pygame.Rect(blue.x,blue.y+blue.height//2-2,10,5)
                    blue_bullets.append(bullet)
           
            if event.type==GREEN_HIT:
                green_health-=1
                
            if event.type==BLUE_HIT:
                blue_health-=1
        
        winner_text=""
        if green_health<=0:
            winner_text="Blue wins!"
        if blue_health<=0:
            winner_text="Green wins!"
        if winner_text!="":
            draw_winner(winner_text)
            break

        keys_pressed=pygame.key.get_pressed()
        green_movements(keys_pressed,green)
        blue_movements(keys_pressed,blue)
        handle_bullets(green_bullets,blue_bullets,green,blue)
        draw(green,blue,green_bullets,blue_bullets,green_health,blue_health)
                
    main()
    
if __name__=="__main__":
    main()
