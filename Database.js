const oracledb = require("oracledb");
// Set database connection details
const dbConfig = {
  user: "system",
  password: "manager",
  connectString: "localhost:1521/orcl",
};

const Query = async (sql) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql);
    await connection.commit();
    return result;
  } catch (error) {
    return (error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
};

const Result = async (...Parameters) => {
  
  let Sql;
  console.log(typeof (Parameters[2]));
  Details = Parameters[2];
    try{
      Details = eval(`(${Parameters[2]})`);
    } catch(err){}
 switch (Parameters[1]) {
    case "Insert":
      if(Parameters[0]=='freq')
      Sql = `insert into ${Parameters[0]} values('${Details.crop_name}','${Details.year1_crop}','${Details.year2_crop}','${Details.year3_crop}','${Details.year4_crop}','${Details.crop_result}')`;
      if(Parameters[0]=='users')
      Sql = `insert into ${Parameters[0]} values('${Details.fname}','${Details.lname}','${Details.email}','${Details.password}','${Details.cpassword}')`;
      if(Parameters[0]=='feedback')
      Sql = `insert into ${Parameters[0]} values('${Details.fname}','${Details.lname}','${Details.email}','${Details.state}','${Details.feedback}')`;
      break;
    case "Update":
      if(Parameters[0]=='freq')
      Sql = `update ${Parameters[0]} set crop_name = '${Parameters[3].crop_name}', year1_crop = '${Parameters[3].year1_crop}',year2_crop = '${Parameters[3].year2_crop}',year3_crop = '${Parameters[3].year3_crop}',year4_crop = '${Parameters[3].year4_crop}',crop_result = '${Parameters[3].crop_result}' where crop_name = '${Details}'`;
      if(Parameters[0]=='users')
      Sql = `update ${Parameters[0]} set fname = '${Parameters[3].fname}', lname = '${Parameters[3].lname}',email = '${Parameters[3].email}',password = '${Parameters[3].password}',cpassword = '${Parameters[3].cpassword}' where email = '${Details}'`;
      if(Parameters[0]=='feedback')
      Sql = `update ${Parameters[0]} set fname = '${Parameters[3].fname}', lname = '${Parameters[3].lname}',email = '${Parameters[3].email}',state = '${Parameters[3].state}',feedback = '${Parameters[3].feedback}' where email = '${Details}'`;
      break;
    case "Delete":
      if(Parameters[0]=='freq')
      Sql = `delete from ${Parameters[0]} where crop_name = '${Details}'`;
      if(Parameters[0]=='users')
      Sql = `delete from ${Parameters[0]} where email = '${Details}'`;
      if(Parameters[0]=='feedback')
      Sql = `delete from ${Parameters[0]} where email = '${Details}'`;
      break;
    case "Read":
      if(Parameters[0]=='freq'){
        Sql = `select * from ${Parameters[0]}`;
        if(Details != "All"){
          Sql = `select * from ${Parameters[0]} where crop_name = '${Details}'`;
        }
      }
      if(Parameters[0]=='users'){
        Sql = `select * from ${Parameters[0]}`;
        if(Details != "All"){
          Sql = `select * from ${Parameters[0]} where email = '${Details}'`;
        }
      }
      if(Parameters[0]=='feedback'){
        Sql = `select * from ${Parameters[0]}`;
        if(Details != "All"){
          Sql = `select * from ${Parameters[0]} where email = '${Details}'`;
        }
      }
      break;
    default:
      console.error("Invalid Parameters");
      break;
  }
  console.log(Sql);
  var result = await Query(Sql);
  return result;
};
module.exports = Result;