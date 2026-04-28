import { Container, Sprite, Texture } from 'pixi.js';
import { sound } from '@pixi/sound';

import { STATE } from '../../main';

export default class Ball {
    constructor(radius = 8, speed = 3, texture, health) {
        this.health = health;
        this.radius = radius;
        
        this._view = new Container();

        const sprite = new Sprite(Texture.from(texture));
        sprite.width = radius * 2;
        sprite.height = radius * 2;
        sprite.anchor.set(0.5);
        this._view.addChild(sprite);
 
        this.x = STATE.app.screen.width / 2;
        this.y = STATE.app.screen.height - 50;
        
        this.speed = speed;
        this.vx = speed;
        this.vy = -1 * speed;
        
        this.bounce = 1;

        this.updatePosition();
    }

    get view() {
        return this._view;
    }
    
    updatePosition() {
        this._view.x = this.x;
        this._view.y = this.y;
        const directionAngle = Math.atan2(this.vy, this.vx);
        const resultAngle = directionAngle + Math.PI / 2;

        if (this.view.children[1]) {
            this.view.children[1].rotation = resultAngle;
        }
    }
    
    move() {
        this.x += this.vx;
        this.y += this.vy;
        this.updatePosition();
    }

    // Обновленная проверка столкновений с границами уровня
    checkLevelBoundsCollision(levelBounds) {
        const bounds = levelBounds.getBounds();
        let collided = false;
        
        // Левая граница
        if (this.x - this.radius <= bounds.left) {
            this.x = bounds.left + this.radius;
            this.vx = -this.vx;
            collided = true;
        }
        
        // Правая граница
        if (this.x + this.radius >= bounds.right) {
            this.x = bounds.right - this.radius;
            this.vx = -this.vx;
            collided = true;
        }
        
        // Верхняя граница
        if (this.y - this.radius <= bounds.top) {
            this.y = bounds.top + this.radius;
            this.vy = -this.vy;
            collided = true;
        }
        
        // Нижняя граница (игровая, обычно мяч падает)
        if (this.y + this.radius >= bounds.bottom) {
            // Можно обработать по-разному: либо смерть, либо отскок
            // Здесь показываем, что мяч упал
            return false;
        }
        
        return collided;
    }
    
    // Проверка столкновений со стенами
    checkWallCollision() {
        // Левая и правая стены
        if (this.x - this.radius <= 0) {
            this.x = this.radius;
            this.vx = -this.vx;
            return true;
        }
        if (this.x + this.radius >= STATE.app.screen.width) {
            this.x = STATE.app.screen.width - this.radius;
            this.vx = -this.vx;
            return true;
        }
        
        // Верхняя стена
        if (this.y - this.radius <= 0) {
            this.y = this.radius;
            this.vy = -this.vy;
            return true;
        }
        
        return false;
    }
    
    // Проверка столкновения с ракеткой
    checkPaddleCollision(paddle) {
        // AABB коллизия круга с прямоугольником
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
            
            return true;
        }
        
        return false;
    }

    checkBricksCollision(bricks) {
        let hit = false;
        
        for (let i = bricks.length - 1; i >= 0; i--) {
            const brick = bricks[i];

            const { x: brickX, y: brickY } = brick.view.getGlobalPosition();

            // Проверка коллизии круга с прямоугольником
            const closestX = Math.max(brickX, Math.min(this.x, brickX + brick.view.width));
            const closestY = Math.max(brickY, Math.min(this.y, brickY + brick.view.height));
            
            const dx = this.x - closestX;
            const dy = this.y - closestY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.radius) {
                const overlap = this.radius - distance;
                
                // Check side of collision
                if (Math.abs(dx) > Math.abs(dy)) {
                    // Collision - horizontal
                    if (dx > 0) {
                        // right side
                        this.x += overlap;
                    } else {
                        // left side
                        this.x -= overlap;
                    }
                    this.vx = -this.vx;
                } else {
                    // Collision - vertical 
                    if (dy > 0) {
                        // bottom side
                        this.y += overlap;
                    } else {
                        // top side
                        this.y -= overlap;
                    }
                    this.vy = -this.vy;
                }
                
                // Remove brick
                brick.getDamage();
                sound.play("hit");
                if (brick.health <= 0) {
                    bricks.splice(i, 1);
                }
                hit = true;
                
                break; // Обрабатываем только одно столкновение за кадр
            }
        }
        
        return hit;
    }

    isFallen(screenHeight) {
        return this.y + this.radius >= screenHeight;
    }
    
    // Сброс мяча в начальную позицию
    reset() {
        this.x = STATE.app.screen.width / 2;
        this.y = STATE.app.screen.height - 50;
        this.vx = this.speed;
        this.vy = -1 * this.speed;
        this.updatePosition();
    }
    
    setSpeed(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }

    stop() {
        this.setSpeed(0,0);
    }
    
    // Увеличение скорости (для сложности)
    increaseSpeed(multiplier = 1.05) {
        this.vx *= multiplier;
        this.vy *= multiplier;
        
        // Ограничиваем максимальную скорость
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