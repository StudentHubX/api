import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from 'src/entity/department.entity';
import { departments } from './departments';
import { UserEntity } from 'src/entity/user.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create() {
    try {
      const departmentEntities = departments.map((department) => {
        return this.departmentRepository.create({
          name: department,
        });
      });

      await Promise.all(
        departmentEntities.map((department) =>
          this.departmentRepository.save(department),
        ),
      );

      console.log('Departments have been created successfully.');
    } catch (error) {
      console.error('Error creating departments:', error);
      throw error; // Re-throwing the error so that it can be caught by higher-level handlers if needed
    }
  }
  async findUsers(departmentId: number): Promise<UserEntity[]> {
    const department = await this.departmentRepository.findOne({
      where: { id: departmentId },
    });
    const usersInDepartment = department.users;
    return usersInDepartment;
  }
}
