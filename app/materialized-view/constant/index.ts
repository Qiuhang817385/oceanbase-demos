import $i18n from "../../../i18n";export const exampleSQL1 = $i18n.get({id:"oceanbase-demo.materialized-view.constant.CreateTableTAInt",dm:"\ncreate table t1(a int, b int, c int, primary key(a, b)); //创建基表\n... //插入数据\n\nCREATE MATERIALIZED VIEW mv1(primary key (a,b))  parallel 30\npartition by hash(a) partitions 4\nREFRESH fast START WITH sysdate() NEXT sysdate() + INTERVAL 1 second\nenable on query computation\nas select t1.a, t1.b, t1.c, t2.d, t2.e from t1 join t2 on t1.b=t2.d; //创建物化视图\n...//绑定执行计划等\n\nselect  /*+ no_mv_rewrite */ count(*) from mv1;//查物化视图\nselect count(*) from mv1;//查物化视图加表\nselect count(*) from (select t1.a, t1.b, t1.c, t2.d, t2.e from t1 join t2 on t1.b=t2.d);//不使用物化视图查询\n"});















export const exampleSQL2 = $i18n.get({id:"oceanbase-demo.materialized-view.constant.CreateTableTAInt.1",dm:"\ncreate table t1(a int, b int, c int, primary key(a, b)); //创建基表\n... //插入数据\n\nCREATE MATERIALIZED VIEW mv2(a,count_b,count,sum_b,primary key(a))  parallel 30\nREFRESH fast START WITH sysdate() NEXT sysdate() + INTERVAL 1 second\nenable on query computation\nas select a, count(b), count(*), sum(b) from t1 group by a; //创建物化视图\n...//绑定执行计划等\n\nselect  /*+ no_mv_rewrite */ * from mv2;//查物化视图\nselect  * from mv2;//查物化视图加表\nselect a, count(b), count(*), sum(b) from t1 group by a;//不使用物化视图查询\n"});













export const exampleSQL3 = $i18n.get({id:"oceanbase-demo.materialized-view.constant.CreateTableTAInt.2",dm:"\ncreate table t1(a int, b int, c int, primary key(a, b)); //创建基表\n... //插入数据\n\nCREATE MATERIALIZED VIEW mv3(a,count_b,count,sum_b, primary key(a)) parallel 30 \npartition by hash(a) partitions 4\nREFRESH fast START WITH sysdate() NEXT sysdate() + INTERVAL 1 second\nenable on query computation\nas select a, count(b), count(*), sum(b) from t1 join t2 on t1.b=t2.d group by a; //创建物化视图\n...//绑定执行计划等\n\nselect  /*+ no_mv_rewrite */ * from mv3; //查物化视图\nselect  * from mv3; //查物化视图加表\nselect a, count(b), count(*), sum(b) from t1 join t2 on t1.b=t2.d group by a;//不使用物化视图查询\n"});















// 直接查询物化视图
const TimeDirectMV = 'TimeDirectMV';
// 实时查询物化视图+表
const TimeMVPlusTable = 'TimeMVPlusTable';
// 不使用物化视图
const TimeWithoutMV = 'TimeWithoutMV';

export const dataSource1 = [
{ volume: 'hundredThousand', value: 134465, type: TimeDirectMV },
{ volume: 'million', value: 197895, type: TimeDirectMV },
{ volume: 'tenMillion', value: 168930, type: TimeDirectMV },
{ volume: 'hundredMillion', value: 1075160, type: TimeDirectMV },

{ volume: 'hundredThousand', value: 903215, type: TimeMVPlusTable },
{ volume: 'million', value: 7888472, type: TimeMVPlusTable },
{ volume: 'tenMillion', value: 21848062, type: TimeMVPlusTable },
{ volume: 'hundredMillion', value: 35448008, type: TimeMVPlusTable },

{ volume: 'hundredThousand', value: 1461870, type: TimeWithoutMV },
{ volume: 'million', value: 3069060, type: TimeWithoutMV },
{ volume: 'tenMillion', value: 15610890, type: TimeWithoutMV },
{ volume: 'hundredMillion', value: 137259459, type: TimeWithoutMV }];


export const dataSource2 = [
{ volume: 'hundredThousand', value: 71522, type: TimeDirectMV },
{ volume: 'million', value: 75143, type: TimeDirectMV },
{ volume: 'tenMillion', value: 72551, type: TimeDirectMV },
{ volume: 'hundredMillion', value: 72799, type: TimeDirectMV },

{ volume: 'hundredThousand', value: 121335, type: TimeMVPlusTable },
{ volume: 'million', value: 150826, type: TimeMVPlusTable },
{ volume: 'tenMillion', value: 989560, type: TimeMVPlusTable },
{ volume: 'hundredMillion', value: 489077, type: TimeMVPlusTable },

{ volume: 'hundredThousand', value: 218113, type: TimeWithoutMV },
{ volume: 'million', value: 1097714, type: TimeWithoutMV },
{ volume: 'tenMillion', value: 4220158, type: TimeWithoutMV },
{ volume: 'hundredMillion', value: 13119572, type: TimeWithoutMV }];


export const dataSource3 = [
{ volume: 'hundredThousand', value: 76950, type: TimeDirectMV },
{ volume: 'million', value: 78534, type: TimeDirectMV },
{ volume: 'tenMillion', value: 76092, type: TimeDirectMV },
{ volume: 'hundredMillion', value: 83301, type: TimeDirectMV },

{ volume: 'hundredThousand', value: 789889, type: TimeMVPlusTable },
{ volume: 'million', value: 1412263, type: TimeMVPlusTable },
{ volume: 'tenMillion', value: 39058691, type: TimeMVPlusTable },
{ volume: 'hundredMillion', value: 43555900, type: TimeMVPlusTable },

{ volume: 'hundredThousand', value: 638442, type: TimeWithoutMV },
{ volume: 'million', value: 2766614, type: TimeWithoutMV },
{ volume: 'tenMillion', value: 7610766, type: TimeWithoutMV },
{ volume: 'hundredMillion', value: 48898678, type: TimeWithoutMV }];