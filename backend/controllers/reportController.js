const User = require("../models/userModel");
const Lead = require("../models/lead");
const asyncHandler = require("express-async-handler");
const moment = require("moment");

// @desc    Post report
// @route   POST /api/report
// @access  Private/Admin
exports.getReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;
  let start_date = moment(startDate, "DD.MM.YYYY").toISOString();
  let end_date = moment(endDate, "DD.MM.YYYY").toISOString();

  let usersEmails = await User.find({ isAdmin: false }, "email _id username");
  let reportData = [];
  let temp_leadsByUsersStatus = [];
  let temp_leadsByUsersStatusDate = [];
  let temp_leadsCountByUsers = [];
  let datefilterleads = [];

  console.log(startDate, endDate);
  console.log(start_date, end_date);
  try {
    // Total Leads Count
    let totalLeadsCount = await Lead.countDocuments();

    // leads Count By Level
    const levelCounts = await Lead.aggregate([
      { $match: { flag: "Active" } },
      {
        $group: {
          _id: { status: "$status" },
          data: { $sum: 1 },
        },
      },
      {
        $project: {
          status: "$_id.status",
          count: "$data",
        },
      },
    ]);

    if (start_date !== null && end_date !== null) {
      let temp_leadsAtLevel4 = await Lead.find(
        {
          $and: [
            { flag: "Active" },
            {
              level_4_date: {
                $gt: start_date,
                $lt: end_date,
              },
            },
          ],
        },
        { _id: 1 }
      );

      temp_leadsAtLevel4.forEach((element) => {
        datefilterleads.push(element._id);
      });

      let temp_leadsAtLevel3 = await Lead.find(
        {
          $and: [
            { flag: "Active" },
            {
              level_3_date: {
                $gt: start_date,
                $lt: end_date,
              },
            },
            { _id: { $nin: datefilterleads } },
          ],
        },
        { _id: 1 }
      );

      temp_leadsAtLevel3.forEach((element) => {
        datefilterleads.push(element._id);
      });

      let temp_leadsAtLevel2 = await Lead.find(
        {
          $and: [
            { flag: "Active" },
            {
              level_2_date: {
                $gt: start_date,
                $lt: end_date,
              },
            },
            { _id: { $nin: datefilterleads } },
          ],
        },
        { _id: 1 }
      );

      temp_leadsAtLevel2.forEach((element) => {
        datefilterleads.push(element._id);
      });

      let temp_leadsAtLevel1 = await Lead.find(
        {
          $and: [
            { flag: "Active" },
            {
              level_1_date: {
                $gt: start_date,
                $lt: end_date,
              },
            },
            { _id: { $nin: datefilterleads } },
          ],
        },
        { _id: 1 }
      );

      temp_leadsAtLevel1.forEach((element) => {
        datefilterleads.push(element._id);
      });

      //   let temp_leadsAtLevel0 = await Lead.find(
      //     {
      //       $and: [
      //         { flag: "Active" },
      //         {
      //           createdAt: {
      //             $gt: start_date,
      //             $lt: end_date,
      //           },
      //         },
      //         { _id: { $nin: datefilterleads } },
      //       ],
      //     },
      //     { _id: 1 }
      //   );

      //   temp_leadsAtLevel0.forEach((element) => {
      //     datefilterleads.push(element._id);
      //   });
    }
    const levelCountsByUsersDate = await Lead.aggregate([
      {
        $match: {
          $and: [{ flag: "Active" }, { _id: { $in: datefilterleads } }],
        },
      },
      {
        $group: {
          _id: { userId: "$user", status: "$status" },
          data: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: "$_id.userId",
          status: "$_id.status",
          count: "$data",
        },
      },
    ]);
    // leadsByUsersStatus

    const levelCountsByUsers = await Lead.aggregate([
      { $match: { flag: "Active" } },
      {
        $group: {
          _id: { userId: "$user", status: "$status" },
          data: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: "$_id.userId",
          status: "$_id.status",
          count: "$data",
        },
      },
    ]);

    // leads Count By Users
    const totalAssigned = await Lead.aggregate([
      { $match: { flag: "Active" } },
      {
        $group: {
          _id: { userId: "$user" },
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: "$_id.userId",
          totalAssigned: "$total",
        },
      },
    ]);

    // leads Count By Entrance Exam
    // const entranceexamCounts = await Lead.aggregate([
    //   { $match: { flag: "Active" } },
    //   {
    //     $group: {
    //       _id: { entrance: "$entrance" },
    //       data: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $project: {
    //       entrance: "$_id.entrance",
    //       count: "$data",
    //     },
    //   },
    // ]);

    // // leads Count By Source
    // const SourceCounts = await Lead.aggregate([
    //   { $match: { flag: "Active" } },
    //   {
    //     $group: {
    //       _id: { source: "$source" },
    //       data: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $project: {
    //       source: "$_id.source",
    //       count: "$data",
    //     },
    //   },
    // ]);

    // Data cleaning and formatting

    for (let i = 0; i < usersEmails.length; i++) {
      let tempid = usersEmails[i]._id.toString();
      var obj1 = {
        username: usersEmails[i].username,
      };
      // var obj2 = {
      //   username: usersEmails[i].username,
      // };
      // levelCountsByUsers.forEach((data) => {
      //   if (data._id == tempid) {
      //     obj1[data.status] = data.count;
      //   }
      // });

      if (start_date !== null && end_date !== null) {
        levelCountsByUsersDate.forEach((data) => {
          if (data._id == tempid) {
            obj1[data.status] = data.count;
          }
        });
        // temp_leadsByUsersStatusDate.push(obj3);
      } else {
        levelCountsByUsers.forEach((data) => {
          if (data._id == tempid) {
            obj1[data.status] = data.count;
          }
        });
      }
      totalAssigned.forEach((data) => {
        if (data._id == tempid) {
          obj1["TotalAssigned"] = data.totalAssigned;
        }
      });

      temp_leadsByUsersStatus.push(obj1);
      // temp_leadsCountByUsers.push(obj2);
    }

    const leadsByUsersStatus =
      temp_leadsByUsersStatus &&
      temp_leadsByUsersStatus.map((user) => ({
        User_Name: user.username,
        Level_1: user["level 1"] ? user["level 1"] : 0,
        Level_2: user["level 2"] ? user["level 2"] : 0,
        Level_3: user["level 3"] ? user["level 3"] : 0,
        Level_4: user["level 4"] ? user["level 4"] : 0,
        Total_Leads_Assigned: user.TotalAssigned,
      }));

    // Leads Assigned Count by user
    // const leadsCountByUsers =
    //   temp_leadsCountByUsers &&
    //   temp_leadsCountByUsers.map((user) => ({
    //     User_Name: user.username,
    //     Total_Leads_Assigned: user.TotalAssigned,
    //   }));

    // // Leads  Count by level
    // const leadsCountByLevel =
    //   levelCounts &&
    //   levelCounts.map((data) => ({
    //     Level: data.status,
    //     Leads_Count: data.count,
    //   }));

    // // Leads  Count by entrance exam
    // const leadsCountByEntrance =
    //   entranceexamCounts &&
    //   entranceexamCounts.map((data) => ({
    //     Entrance_Exam: data.entrance === "" ? "None" : data.entrance,
    //     Leads_Count: data.count,
    //   }));

    // // Leads  Count by entrance exam
    // const leadsCountBySource =
    //   SourceCounts &&
    //   SourceCounts.map((data) => ({
    //     Source: data.source === "" ? "None" : data.source,
    //     Leads_Count: data.count,
    //   }));

    // Pushing data to final report

    // if (start_date !== null && end_date !== null) {
    //   const leadsByUsersStatusDate =
    //     temp_leadsByUsersStatusDate &&
    //     temp_leadsByUsersStatusDate.map((user) => ({
    //       User_Name: user.username,
    //       Level_0: user["level 0"] ? user["level 0"] : 0,
    //       Level_1: user["level 1"] ? user["level 1"] : 0,
    //       Level_2: user["level 2"] ? user["level 2"] : 0,
    //       Level_3: user["level 3"] ? user["level 3"] : 0,
    //       Level_4: user["level 4"] ? user["level 4"] : 0,
    //     }));

    //   reportData.push({
    //     Title: `Leads count by Status and Users From ${startDate} To ${endDate}`,
    //   });
    //   reportData.push(leadsByUsersStatusDate);
    // }
    // reportData.push({ Title: `Total Leads Count` });
    // reportData.push({ Total_Leads_Count: totalLeadsCount });
    // reportData.push({ Title: `Leads Count By Users` });
    // reportData.push(leadsCountByUsers);
    // reportData.push({ Title: `Leads Count By Status and Users` });
    reportData.push(leadsByUsersStatus);
    // reportData.push({ Title: `Leads Count By Status` });
    // reportData.push(leadsCountByLevel);
    // reportData.push({ Title: `Leads Count By Entrance Exam` });
    // reportData.push(leadsCountByEntrance);
    // reportData.push({ Title: `Leads Count By Source` });
    // reportData.push(leadsCountBySource);

    res.json({ reportData, datefilterleads });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error(error.message);
  }
});

// @desc    Post report data
// @route   POST /api/report/getdata
// @access  Private/Admin
exports.getReportData = asyncHandler(async (req, res) => {
  const leadsIds = req.body.leadsIds;
  console.log(leadsIds);
  const leads = await Lead.find(
    { $and: [{ flag: "Active" }, { _id: { $in: leadsIds } }] },
    {
      applicantName: 1,
      email: 1,
      mobile: 1,
      createdAt: 1,
      city: 1,
      source: 1,
      percentileGK: 1,
      status: 1,
      entrance: 1,
    }
  )
    .populate("user", "username")
    .sort([["status", "desc"]]);

  return res.json(leads);
});
