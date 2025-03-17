SELECT top 1000 [id]
      ,[user_id]
      ,[identifier]
      ,[action_performed]
      ,[status]
      ,[description]
      ,[date_time]
      ,[from_system]
  FROM [e_one].[dbo].[Action_Log] order by date_time desc
