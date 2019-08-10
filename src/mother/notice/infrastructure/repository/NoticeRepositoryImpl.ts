import Axios from 'axios';
import { inject, injectable } from "inversify";
import CommonErrorService from 'src/common/domain/service/CommonErrorService';
import { inversifyIds } from "src/inversify.id"
import Notice from '../../domain/model/Notice';
import NoticeRepository from '../../domain/repository/NoticeRepository'

const NOTICE_REPO_URL = `${process.env.REPOSITORY_URL}/notices`

interface NoticeDto {
  id: number
  title: string
  content: string
}

@injectable()
export default class NoticeRepositoryImpl implements NoticeRepository {
  @inject(inversifyIds.common.CommonErrorService) private commonErrorService!: CommonErrorService

  public findById(id: number): Promise<Notice> {
    return new Promise((resolve, rejected) => {
      Axios.get<NoticeDto>(`${NOTICE_REPO_URL}/${id}`)
        .then(({ data }) => resolve(data))
        .catch(e => rejected(this.commonErrorService.createRepositoryErrorFrom(e)));
    })
  }
}