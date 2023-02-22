import { Injectable } from '@nestjs/common';
import { CreateMytestDto } from './dto/create-mytest.dto';
import { UpdateMytestDto } from './dto/update-mytest.dto';

@Injectable()
export class MytestService {
  create(createMytestDto: CreateMytestDto) {
    return 'This action adds a new mytest';
  }

  findAll() {
    return {
      data: {
        上海市: {
          aqi: 30,
          rank: 1,
        },
        云南省: {
          aqi: 100,
          rank: 2,
        },
        内蒙古自治区: {
          aqi: 200,
          rank: 3,
        },
        北京市: {
          aqi: 150,
          rank: 4,
        },
        台湾省: {
          aqi: 0,
          rank: 5,
        },
        吉林省: {
          aqi: 68,
          rank: 6,
        },
        四川省: {
          aqi: 142,
          rank: 7,
        },
        天津市: {
          aqi: 188,
          rank: 8,
        },
        宁夏回族自治区: {
          aqi: 68,
          rank: 9,
        },
        安徽省: {
          aqi: 252,
          rank: 10,
        },
        山东省: {
          aqi: 166,
          rank: 11,
        },
        山西省: {
          aqi: 224,
          rank: 12,
        },
        广东省: {
          aqi: 168,
          rank: 13,
        },
        广西壮族自治区: {
          aqi: 56,
          rank: 14,
        },
        新疆维吾尔自治区: {
          aqi: 300,
          rank: 15,
        },
        江苏省: {
          aqi: 48,
          rank: 16,
        },
        江西省: {
          aqi: 88,
          rank: 17,
        },
        河北省: {
          aqi: 180,
          rank: 18,
        },
        河南省: {
          aqi: 184,
          rank: 19,
        },
        浙江省: {
          aqi: 40,
          rank: 20,
        },
        海南省: {
          aqi: 60,
          rank: 21,
        },
        湖北省: {
          aqi: 98,
          rank: 22,
        },
        湖南省: {
          aqi: 89,
          rank: 23,
        },
        澳门特别行政区: {
          aqi: 0,
          rank: 24,
        },
        甘肃省: {
          aqi: 134,
          rank: 25,
        },
        福建省: {
          aqi: 68,
          rank: 26,
        },
        西藏自治区: {
          aqi: 10,
          rank: 27,
        },
        贵州省: {
          aqi: 86,
          rank: 28,
        },
        辽宁省: {
          aqi: 184,
          rank: 29,
        },
        重庆市: {
          aqi: 96,
          rank: 30,
        },
        陕西省: {
          aqi: 64,
          rank: 31,
        },
        青海省: {
          aqi: 184,
          rank: 32,
        },
        香港特别行政区: {
          aqi: 0,
          rank: 33,
        },
        黑龙江省: {
          aqi: 202,
          rank: 34,
        },
      },
      returnCode: 0,
      success: true,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} mytest`;
  }

  update(id: number, updateMytestDto: UpdateMytestDto) {
    return `This action updates a #${id} mytest`;
  }

  remove(id: number) {
    return `This action removes a #${id} mytest`;
  }
}
