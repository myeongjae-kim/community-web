import { Container } from 'inversify';
import { NextApplication } from '../nextjs/NextApplication';
import { TYPES } from './types';

import "src/common/api/CommonController";
import "src/mother/api/MotherController";
import "src/mother/notice/api/NoticeController";

export const createInversifyContainer = () => {
  const container = new Container();
  container.bind<NextApplication>(TYPES.NextApplication).to(NextApplication);
  return container;
}