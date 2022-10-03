import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTreeElementDto } from './add-tree-element.dto';
import { Repository } from 'typeorm';
import { TreeElement } from './tree-element.entity';

export interface TreeNode extends Omit<TreeElement, 'parentId'> {
  children?: TreeNode[];
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TreeElement)
    private treeElementRepo: Repository<TreeElement>,
  ) {}

  async getTree(): Promise<TreeNode> {
    const root = await this.getTreeRoot();
    return this.loadSubtree(root);
  }

  async addTreeElement(payload: AddTreeElementDto): Promise<void> {
    await this.treeElementRepo.insert(payload);
  }

  async deleteTreeElement(id: number): Promise<void> {
    await this.treeElementRepo.delete(id);
  }

  private getTreeRoot(): Promise<TreeElement> {
    return this.treeElementRepo.findOne({ where: { parentId: null } });
  }

  private getChildren(root: TreeElement): Promise<TreeElement[]> {
    return this.treeElementRepo.find({ where: { parentId: root.id } });
  }

  private async loadSubtree(root: TreeElement): Promise<TreeNode> {
    const { parentId: _parentId, ...rest } = root;
    const rootNode = { ...rest } as TreeNode;
    const children = await this.getChildren(root);
    if (!children || !children.length) {
      return rootNode;
    }

    rootNode.children = [];
    for (const kid of children) {
      const kidNode = await this.loadSubtree(kid);
      rootNode.children.push(kidNode);
    }

    return rootNode;
  }
}
