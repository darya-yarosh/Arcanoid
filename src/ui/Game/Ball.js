import { Container, Sprite, Texture } from 'pixi.js';
import { sound } from '@pixi/sound';

import { STATE } from '../../main';

export default class Ball {
    constructor(radius = 8, speed = 3, texture, health) {
        this.health = health;
        this.radius = radius;
        this.isMoving = false;
        this.isSticked = true;
        this.paddle = null;
        
        this._view = new Container();

        const sprite = new Sprite(Texture.from(texture));
        sprite.width = radius * 2;
        sprite.height = radius * 2;
        sprite.anchor.set(0.5);
        this._view.addChild(sprite);
 
        this.x = STATE.app.screen.width / 2;
        this.y = STATE.app.screen.height - 50;
        
        this.speed = speed;
        this.vx = 0;
        this.vy = 0;
        
        this.bounce = 1;

        this.updatePosition();
    }

    get view() {
        return this._view;
    }
    
    updatePosition() {
        this._view.x = this.x;
        this._view.y = this.y;
    }

    stickToPaddle(paddle) {
        this.paddle = paddle;
        this.isSticked = true;
        this.isMoving = false;
        this.updateStickedPosition();
    }

    updateStickedPosition() {
        if (this.isSticked && this.paddle) {
            this.x = this.paddle.x + this.paddle.width / 2;
            this.y = this.paddle.y - this.radius;
            this.updatePosition();
        }
    }

    launch() {
        if (!this.isSticked) return;
        
        this.isSticked = false;
        this.isMoving = true;

        this.vx = 0;
        this.vy = -this.speed;
    }

    move() {
        if (this.isSticked) {
            this.updateStickedPosition();
            return;
        }

        if (!this.isMoving) {
            return;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        this.updatePosition();
    }

    checkLevelBoundsCollision(levelBounds) {
        if (this.isSticked) {
            return false;
        }
        
        const bounds = levelBounds.getBounds();
        let collided = false;

        const isLeftBound = this.x - this.radius <= bounds.left;
        if (isLeftBound) {
            this.x = bounds.left + this.radius;
            this.vx = -this.vx;
            collided = true;
        }

        const isRightBound = this.x + this.radius >= bounds.right;
        if (isRightBound) {
            this.x = bounds.right - this.radius;
            this.vx = -this.vx;
            collided = true;
        }

        const isTopBound = this.y - this.radius <= bounds.top;
        if (isTopBound) {
            this.y = bounds.top + this.radius;
            this.vy = -this.vy;
            collided = true;
        }
        
        return collided;
    }
    
    checkPaddleCollision(paddle) {
        if (this.isSticked || !this.isMoving) {
            return false;
        }
        
        const ballLeft = this.x - this.radius;
        const ballRight = this.x + this.radius;
        const ballTop = this.y - this.radius;
        const ballBottom = this.y + this.radius;
        
        const paddleLeft = paddle.x;
        const paddleRight = paddle.x + paddle.width;
        const paddleTop = paddle.y;
        const paddleBottom = paddle.y + paddle.height;
        
        if (ballRight > paddleLeft && 
            ballLeft < paddleRight && 
            ballBottom > paddleTop && 
            ballTop < paddleBottom) {
            
            // Вычисляем точку удара относительно центра ракетки
            const hitPoint = (this.x - paddleLeft) / paddle.width;
            const angle = (hitPoint - 0.5) * Math.PI / 2; // -45° до +45°
            
            // Новая скорость
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            this.vx = Math.sin(angle) * speed;
            this.vy = -Math.cos(angle) * speed;
            
            // Корректируем позицию, чтобы мяч не застрял
            this.y = paddleTop - this.radius;
            paddle.onHit();
            
            return true;
        }
        
        return false;
    }

    checkBricksCollision(bricks) {
        if (this.isSticked) {
            return false;
        }
        
        let hit = false;
        
        for (let i = bricks.length - 1; i >= 0; i--) {
            const brick = bricks[i];

            const { x: brickX, y: brickY } = brick.view.getGlobalPosition();

            const closestX = Math.max(brickX, Math.min(this.x, brickX + brick.view.width));
            const closestY = Math.max(brickY, Math.min(this.y, brickY + brick.view.height));
            
            const dx = this.x - closestX;
            const dy = this.y - closestY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.radius) {
                const overlap = this.radius - distance;
                
                const isHorizontalCollision = Math.abs(dx) > Math.abs(dy);
                if (isHorizontalCollision) {
                    const isRightSide = dx > 0;
                    if (isRightSide) {
                        this.x += overlap;
                    } else {
                        this.x -= overlap;
                    }
                    this.vx = -this.vx;
                } else {
                    const isBottomSide = dy > 0;
                    if (isBottomSide) {
                        this.y += overlap;
                    } else {
                        this.y -= overlap;
                    }
                    this.vy = -this.vy;
                }
                
                brick.getDamage();
                sound.play("hit");
                if (brick.health <= 0) {
                    bricks.splice(i, 1);
                }
                hit = true;
                
                break;
            }
        }
        
        return hit;
    }

    isFallen(bottomBound) {
        if (this.isSticked) {
            return false;
        }

        return this.y + this.radius >= bottomBound;
    }
    
    reset() {
        this.x = STATE.app.screen.width / 2;
        this.y = STATE.app.screen.height - 50;
        this.vx = 0;
        this.vy = 0;
        this.isMoving = false;
        this.isSticked = true;
        this.updatePosition();
    }
    
    stop() {
        this.isMoving = false;
        this.vx = 0;
        this.vy = 0;
    }
    
    increaseSpeed(multiplier = 1.05) {
        if (this.isSticked) {
            return;
        }
        
        this.vx *= multiplier;
        this.vy *= multiplier;
        
        const maxSpeed = 12;
        this.vx = Math.min(Math.max(this.vx, -maxSpeed), maxSpeed);
        this.vy = Math.min(Math.max(this.vy, -maxSpeed), maxSpeed);
    }

    setVisible(visible) {
        this._view.visible = visible;
    }

    destroy() {
        this._view.destroy();
    }
}