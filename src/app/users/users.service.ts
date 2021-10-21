import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>
    ) { }


    async findAll() {
        return await this.userRepository.find({
            select: ['id', 'firstName', 'lastName']
        });

    }
    async findOneOrFail(conditions: FindConditions<UsersEntity>, options?: FindOneOptions<UsersEntity>) {


        try {
            return await this.userRepository.findOneOrFail(conditions, options);
        } catch (error) {
            throw new NotFoundException(error.message);
        }

    }

    async store(data: CreateUserDto) {
        const user = this.userRepository.create(data);
        return await this.userRepository.save(user);

    }
    async update(id: string, data: UpdateUserDto) {


        const user = await this.findOneOrFail({ id });

        this.userRepository.merge(user, data);

        return await this.userRepository.save(user);


    }
    async destroy(id: string) {
        await this.findOneOrFail({ id });
        return await this.userRepository.delete(id);

    }


}
