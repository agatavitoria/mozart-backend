import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { IS_DEV } from '~/app.vars';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    let options: any;
    if (IS_DEV) {
      options = {
        log: [
          { emit: 'event', level: 'query' },
          { emit: 'stdout', level: 'info' },
          { emit: 'stdout', level: 'warn' },
          { emit: 'stdout', level: 'error' },
        ],
        errorFormat: 'colorless',
      };
    }
    super(options);
  }

  async onModuleInit() {
    const handleQueryEvent = (event: Prisma.QueryEvent) => {
      console.log(`Query: ${event.query}`);
      console.log(`Params: ${event.params}`);
      console.log(`Duration: ${event.duration}ms`);
    };

    const handleSoftDelete = async (
      params: Prisma.MiddlewareParams,
      next: (params: Prisma.MiddlewareParams) => void,
    ) => {
      const isDelete = params.action === 'delete';
      const isDeleteMany = params.action === 'deleteMany';
      const isFindUnique = params.action === 'findUnique';
      const isFindFirst = params.action === 'findFirst';
      const isFindMany = params.action === 'findMany';
      const hasArgs = !!params?.args;

      const setDeletedAtFromDataParams = (params: Prisma.MiddlewareParams) => {
        const hasData = !!params?.args?.data;

        if (hasData) {
          params.args.data.deletedAt = new Date();
        } else {
          params.args.data = {
            deletedAt: new Date(),
          };
        }
      };
      const setDeletedAtFromWhereParams = (params: Prisma.MiddlewareParams) => {
        const hasWhere = !!params?.args?.where;

        if (hasWhere) {
          params.args.where.deletedAt = null;
        } else {
          params.args.where = {
            deletedAt: null,
          };
        }
      };

      if (!hasArgs) {
        params.args = {};
      }
      if (isDelete) {
        params.action = 'update';

        setDeletedAtFromDataParams(params);
      }
      if (isDeleteMany) {
        params.action = 'updateMany';

        setDeletedAtFromDataParams(params);
      }
      if (isFindUnique || isFindFirst) {
        params.action = 'findFirst';

        setDeletedAtFromWhereParams(params);
      }
      if (isFindMany) {
        setDeletedAtFromWhereParams(params);
      }

      return next(params);
    };

    this.$on<any>('query', handleQueryEvent);
    this.$use(handleSoftDelete);

    // await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
