SET NOCOUNT ON;

DECLARE @dDate AS DATE = CAST(GETDATE() AS DATE);
DECLARE @cDate AS VARCHAR(60) = CAST(GETDATE() AS VARCHAR);
DECLARE @startDate AS VARCHAR(30) = CAST(CAST(DATEADD(DAY, -1, @dDate) AS DATE) AS VARCHAR);
DECLARE @endDate AS VARCHAR(30) = CAST(CAST(DATEADD(DAY, -1, @dDate) AS DATE) AS VARCHAR);

DECLARE @fileName AS VARCHAR(120) = 'MoMo_PushPull_' + REPLACE(REPLACE(@startDate, ' ', ''), ':', '') + '.csv';

PRINT 'Start Date: ' + @startDate + ' End Date: ' + @endDate;

DECLARE @separator VARCHAR(255) = '[sep=,' + CHAR(13) + CHAR(10) + 'Date]';

DECLARE @DynamicSQL VARCHAR(MAX) = '
    SELECT upd_time, tra_date,
        (BRA_CODE + ''/'' + CUS_NUM + ''/'' + CUR_CODE + ''/'' + LED_CODE + ''/'' + SUB_ACCT_CODE) AS ACCOUNT,
        SUBSTRING(remarks, 1, CHARINDEX(''/'', remarks) - 1) AS TRANSACTIONID,
        (SELECT TOP 1 value FROM STRING_SPLIT(remarks, ''/'') WHERE value LIKE ''%[0-9]%'') AS MSISDN,
        tra_amt AS Amount, crnt_bal AS BALANCE, Deb_cre_ind AS INDICATOR
    FROM transact
    WHERE tra_date = ''28 Jan 2025''
        AND led_code = 5100
        AND sub_acct_code = 2
        AND cus_num = 104048
        AND Deb_cre_ind IN (1, 2)
        AND can_rea_code = 0
    ORDER BY upd_time ASC';

PRINT @DynamicSQL;

DECLARE @message AS NVARCHAR(MAX) = 'Dear All,</br></br>
The attached file contains the extracted transactions for 28 Jan 2025.</br></br>
Kind regards,';

-- Send the email with the query results attached
EXEC msdb.dbo.sp_send_dbmail
    @profile_name = 'GTBank',
    @recipients = 'benjamin.iriho@gtbank.com',
    @body = @message,
    @body_format = 'HTML',
    @subject = 'MoMo daily transactions',
    @query = @DynamicSQL,
    @query_attachment_filename = @fileName,
    @query_result_separator = ',',
    @query_result_no_padding = 1,
    @attach_query_result_as_file = 1;
