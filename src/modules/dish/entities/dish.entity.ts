import {
    IsIn,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default :0})
    quantity: number;

    @Column({default :false})
    checked: boolean;

    @Column()
    imageUrl: string;

    @Column()
    @IsNotEmpty({ message: 'Le type est obligatoire.' })
    @IsIn(['Appetizers', 'Main Course','Desserts'], {
        message: 'Le type doit être soit Appetizers ou Main Course ou Desserts.',
    })
    type: string;
}
