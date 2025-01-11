import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Dish } from '../../dish/entities/dish.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Dish, (dish) => dish.id, { eager: true })  
    @JoinColumn({ name: 'idDish' }) 
    idDish: number;

    @ManyToOne(() => User, user => user.id,{ eager: true })
    @JoinColumn({ name: 'idUser' }) 
    idUser: number;

    @Column()
    nbStars: number;

    @Column()
    feedback: string;
}