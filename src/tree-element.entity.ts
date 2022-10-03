import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tree_element')
export class TreeElement {
  constructor(animal?: Partial<TreeElement>) {
    Object.assign(this, animal || {});
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('text')
  name: string;

  @Column('integer', { nullable: true })
  parentId: number | null;
}
