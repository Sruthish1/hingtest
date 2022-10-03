import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { AddTreeElementDto } from './add-tree-element.dto';
import { AppService, TreeNode } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  hello(): string {
    return 'Hello World!';
  }

  @Get('api/tree')
  @HttpCode(200)
  getTree(): Promise<TreeNode> {
    return this.appService.getTree();
  }

  @Post('api/tree')
  @HttpCode(204)
  addTreeElement(@Body() payload: AddTreeElementDto): Promise<void> {
    return this.appService.addTreeElement(payload);
  }

  @Delete('api/tree/:id')
  @HttpCode(200)
  deleteTreeElement(@Param('id') id: number) {
    return this.appService.deleteTreeElement(id);
  }
}
