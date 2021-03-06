USE [master]
GO
/****** Object:  Database [webchat1]    Script Date: 3/8/2019 11:44:10 AM ******/
CREATE DATABASE [webchat1]
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [webchat1].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [webchat1] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [webchat1] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [webchat1] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [webchat1] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [webchat1] SET ARITHABORT OFF 
GO
ALTER DATABASE [webchat1] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [webchat1] SET AUTO_SHRINK ON 
GO
ALTER DATABASE [webchat1] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [webchat1] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [webchat1] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [webchat1] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [webchat1] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [webchat1] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [webchat1] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [webchat1] SET  DISABLE_BROKER 
GO
ALTER DATABASE [webchat1] SET AUTO_UPDATE_STATISTICS_ASYNC ON 
GO
ALTER DATABASE [webchat1] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [webchat1] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [webchat1] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [webchat1] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [webchat1] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [webchat1] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [webchat1] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [webchat1] SET  MULTI_USER 
GO
ALTER DATABASE [webchat1] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [webchat1] SET DB_CHAINING OFF 
GO
ALTER DATABASE [webchat1] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [webchat1] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [webchat1] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'webchat1', N'ON'
GO
USE [webchat1]
GO
/****** Object:  Table [dbo].[chat]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL,
	[is_group] [bit] NULL DEFAULT ((0)),
	[create_date] [datetime] NULL,
	[is_deleted] [bit] NULL DEFAULT ((0)),
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[contacts]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contacts](
	[user_id] [int] NOT NULL,
	[friend_id] [int] NOT NULL,
	[status] [bit] NULL DEFAULT ((0)),
	[chat_id] [int] NULL,
	[id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_contacts] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[file]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[file](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[file_name] [nvarchar](200) NULL,
	[file_path] [nvarchar](500) NULL,
	[file_type] [nvarchar](50) NULL,
	[owner] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[messages]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[messages](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[chat_id] [int] NULL,
	[body] [nvarchar](500) NULL,
	[send_time] [datetime] NULL DEFAULT (getdate()),
	[sender] [int] NOT NULL,
	[is_deleted] [bit] NULL DEFAULT ((0)),
	[file_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[user_has_chat]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_has_chat](
	[user_id] [int] NOT NULL,
	[chat_id] [int] NOT NULL,
	[status] [int] NULL DEFAULT ((0)),
	[join_date] [datetime] NULL DEFAULT (getdate()),
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[chat_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[user_has_message]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_has_message](
	[user_id] [int] NOT NULL,
	[message_id] [int] NOT NULL,
	[seen_time] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC,
	[message_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[user_info]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_info](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NULL,
	[sex] [nvarchar](3) NULL,
	[email] [nvarchar](50) NULL,
	[birthday] [datetime] NULL,
	[phone] [nvarchar](15) NULL,
	[is_online] [bit] NULL DEFAULT ((0)),
	[user_name] [nvarchar](50) NULL,
	[password] [nvarchar](50) NULL,
	[create_date] [datetime] NULL DEFAULT (getdate()),
	[is_active] [bit] NULL DEFAULT ((1)),
	[avatar] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC,
	[phone] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[user_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[contacts]  WITH CHECK ADD FOREIGN KEY([friend_id])
REFERENCES [dbo].[user_info] ([id])
GO
ALTER TABLE [dbo].[contacts]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[user_info] ([id])
GO
ALTER TABLE [dbo].[file]  WITH CHECK ADD  CONSTRAINT [FK_file_user_info] FOREIGN KEY([owner])
REFERENCES [dbo].[user_info] ([id])
GO
ALTER TABLE [dbo].[file] CHECK CONSTRAINT [FK_file_user_info]
GO
ALTER TABLE [dbo].[messages]  WITH CHECK ADD FOREIGN KEY([chat_id])
REFERENCES [dbo].[chat] ([id])
GO
ALTER TABLE [dbo].[messages]  WITH CHECK ADD FOREIGN KEY([sender])
REFERENCES [dbo].[user_info] ([id])
GO
ALTER TABLE [dbo].[user_has_chat]  WITH CHECK ADD FOREIGN KEY([chat_id])
REFERENCES [dbo].[chat] ([id])
GO
ALTER TABLE [dbo].[user_has_chat]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[user_info] ([id])
GO
ALTER TABLE [dbo].[user_has_message]  WITH CHECK ADD FOREIGN KEY([message_id])
REFERENCES [dbo].[messages] ([id])
GO
ALTER TABLE [dbo].[user_has_message]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[user_info] ([id])
GO
ALTER TABLE [dbo].[user_info]  WITH CHECK ADD  CONSTRAINT [FK_user_info_file] FOREIGN KEY([avatar])
REFERENCES [dbo].[file] ([id])
GO
ALTER TABLE [dbo].[user_info] CHECK CONSTRAINT [FK_user_info_file]
GO
ALTER TABLE [dbo].[user_info]  WITH CHECK ADD  CONSTRAINT [user_gioi_tinh] CHECK  (([sex]=N'Nam' OR [sex]=N'Nữ'))
GO
ALTER TABLE [dbo].[user_info] CHECK CONSTRAINT [user_gioi_tinh]
GO
/****** Object:  StoredProcedure [dbo].[add_contact]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[add_contact] @id_user int,@id_friend INT
AS
BEGIN
	
	DECLARE @a INT
	DECLARE @chat_id INT
	SELECT @a=COUNT(*) FROM dbo.contacts WHERE user_id=@id_user AND friend_id=@id_friend

	IF(@a=1) RETURN 0

	SELECT @chat_id=chat_id FROM dbo.contacts WHERE user_id=@id_friend AND friend_id=@id_user


	IF(@chat_id IS NULL)
	BEGIN
		EXEC @chat_id = new_chat @id_user,NULL,0
	
		INSERT INTO dbo.user_has_chat 
				( user_id,chat_id,status, join_date )
		VALUES  ( @id_friend,
				  @chat_id, -- chat_id - int
				  0, -- chat_status - int
				  GETDATE()  -- join_date - datetime
				  )
	END

	INSERT INTO dbo.contacts
	        ( user_id, friend_id, status,chat_id )
	VALUES  ( @id_user, -- user_id - int
	          @id_friend, -- friend_id - int
	          0,  -- blocked - bit
	          @chat_id)
	
	RETURN @chat_id
END

GO
/****** Object:  StoredProcedure [dbo].[add_ms]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[add_ms] @user_id INT,@chat_id INT,@ms NVARCHAR(1000)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @a INT
	DECLARE @msid INT
	SELECT @a=COUNT(*) FROM dbo.user_has_chat
	WHERE dbo.user_has_chat.user_id=@user_id 
	AND dbo.user_has_chat.chat_id=@chat_id
	AND dbo.user_has_chat.status <>-1
	IF(@a=0)RETURN 0

	INSERT dbo.messages
		    ( chat_id ,
		        body ,
		        send_time ,
		        sender ,
		        is_deleted
		    )
	VALUES  ( @chat_id , -- chat_id - int
		        @ms , -- body - nvarchar(500)
		        GETDATE() , -- send_time - datetime
		        @user_id , -- sender - int
		        0  -- is_deleted - bit
		    )
	SET @msid=SCOPE_IDENTITY()
	SELECT user_id,ROW_NUMBER() OVER(ORDER BY user_id ASC) AS Row# INTO #users FROM dbo.chat,dbo.user_has_chat WHERE dbo.chat.id=dbo.user_has_chat.chat_id and dbo.chat.id=@chat_id
	DECLARE @l INT,@i INT,@usid INT,@s DATETIME
	SELECT TOP(1) @l=Row# FROM #users ORDER BY Row# DESC
	SET @i=1
	WHILE @i<=@l
	BEGIN
		SELECT @usid=user_id FROM #users WHERE Row#=@i
		IF(@usid=@user_id)
			SET @s=GETDATE()
		ELSE
			SET @s=NULL
		INSERT dbo.user_has_message
			    ( user_id ,
			        message_id ,
			        seen_time 
			    )
		VALUES  ( @usid , -- user_id - int
			        @msid , -- message_id - int
			        @s  -- seen_time - datetime
			    )
			       
		SET @i=@i+1
	END 
	SELECT dbo.messages.id AS message_id,body,send_time,GETDATE() AS seen_time,sender,name,file_id FROM dbo.messages,dbo.user_info WHERE dbo.messages.id=@msid AND dbo.messages.sender=dbo.user_info.id
	RETURN @msid
END

GO
/****** Object:  StoredProcedure [dbo].[block_user]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[block_user] @userid INT,@blockid INT
AS
BEGIN
	DECLARE @a INT
	SELECT @a=COUNT(*) FROM dbo.contacts 
	WHERE user_id=@userid AND friend_id=@blockid

	IF(@a=0)
	EXEC dbo.add_contact @id_user = @userid, -- int
	    @id_friend = @blockid -- int
	

	UPDATE dbo.contacts SET status=-1 
	FROM dbo.contacts WHERE user_id=@userid AND friend_id=@blockid

	UPDATE dbo.user_has_chat SET status=-1
	FROM dbo.contacts,dbo.user_has_chat WHERE  dbo.contacts.chat_id=dbo.user_has_chat.chat_id
	AND dbo.user_has_chat.user_id=@userid
END

GO
/****** Object:  StoredProcedure [dbo].[change_avatar]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[change_avatar] @user_id int,@f_name NVARCHAR(200),@f_path NVARCHAR(500),@f_type NVARCHAR(50)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @file_id int
	SET @file_id=0
	EXEC @file_id=dbo.up_file @name = @f_name, -- nvarchar(200)
	    @path = @f_path, -- nvarchar(500)
	    @type = @f_type, -- nvarchar(50)
		@user = @user_id
	IF(@file_id=0) RETURN 0
	UPDATE dbo.user_info SET avatar = @file_id WHERE dbo.user_info.id=@user_id
	RETURN @file_id
END

GO
/****** Object:  StoredProcedure [dbo].[check_email]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[check_email] @email nvarchar(50)
AS
BEGIN
SELECT COUNT(*) FROM dbo.user_info WHERE email=@email
END







GO
/****** Object:  StoredProcedure [dbo].[check_login]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[check_login]
 @user_name nvarchar(50),
 @password nvarchar(50)
AS
BEGIN
	DECLARE @id INT
	SET @id=0
   SELECT @id=id FROM dbo.user_info WHERE user_name=@user_name AND password =@password
   SELECT @id
   RETURN @id
END










GO
/****** Object:  StoredProcedure [dbo].[check_phone]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[check_phone] @phone nvarchar(50)
AS
BEGIN
SELECT COUNT(*) FROM dbo.user_info WHERE phone=@phone
END







GO
/****** Object:  StoredProcedure [dbo].[check_user_name]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[check_user_name] @user_name nvarchar(50)
AS
BEGIN
	SELECT COUNT(*) FROM dbo.user_info WHERE user_name=@user_name
END









GO
/****** Object:  StoredProcedure [dbo].[create_user]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[create_user]
 @user_name nvarchar(50),
 @password nvarchar(50),
 @name NVARCHAR(50),
 @sex NVARCHAR(3),
 @email nvarchar(50),
 @birthday NVARCHAR(20),
 @phone NVARCHAR(15)
 AS
 BEGIN
	INSERT dbo.user_info
		    ( name ,
		        sex ,
		        email ,
		        birthday ,
		        phone ,
		        user_name ,
		        password 
		    )
	VALUES  ( @name , -- name - nvarchar(50)
		        @sex , -- sex - nvarchar(3)
		        @email , -- email - nvarchar(50)
		        CONVERT(DATE,@birthday,103) , -- birthday - datetime
		        @phone , -- phone - nvarchar(15)
		        @user_name, -- user_name - nvarchar(50)
		        @password  -- pass_word - nvarchar(50)
		    )
	RETURN SCOPE_IDENTITY()
 END







GO
/****** Object:  StoredProcedure [dbo].[delete_ms]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[delete_ms] @user INT,@ms_id INT
AS
BEGIN
	DELETE dbo.user_has_message
	WHERE message_id=@ms_id AND user_id=@user
END



GO
/****** Object:  StoredProcedure [dbo].[get_chat_id]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[get_chat_id] @user1 int,@user2 INT
AS 
BEGIN
   	DECLARE @chat_id INT
	SELECT @chat_id=chat.id FROM dbo.chat,dbo.user_has_chat
	WHERE chat.id = dbo.user_has_chat.chat_id
	GROUP BY chat.id 
	HAVING COUNT(dbo.user_has_chat.user_id)=2
	RETURN @chat_id
END


GO
/****** Object:  StoredProcedure [dbo].[get_chats]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[get_chats] @user_id INT,@top INT,@bigthan_ms_id INT,@smallthan_ms_id INT
AS
BEGIN
	IF(@bigthan_ms_id IS NULL)
		SET @bigthan_ms_id =0
	IF(@smallthan_ms_id IS NULL)
		SET @smallthan_ms_id = 999999
	IF(@top IS NULL)
		SET @top = 0

	--lay danh sach cac chat cua user
	SELECT  * INTO #chat FROM dbo.user_has_chat WHERE user_id=@user_id AND status<>-1

	SELECT TOP(@top) MAX(temp.id) AS message_id,temp.chat_id INTO #chat_ms FROM
	(SELECT dbo.messages.id ,#chat.chat_id FROM #chat LEFT JOIN dbo.messages 
	ON messages.chat_id = #chat.chat_id
	AND dbo.messages.id>@bigthan_ms_id
	AND dbo.messages.id<@smallthan_ms_id) AS temp  JOIN dbo.user_has_message ON user_has_message.message_id = temp.id
	GROUP BY temp.chat_id

	 SELECT temp3.chat_id,temp3.message_id,temp3.send_time,seen_time,temp3.body,temp3.sender_name,sender,temp3.is_group,temp3.name INTO #ch_ms_sd FROM
	 (SELECT temp2.chat_id,temp2.send_time,temp2.message_id,temp2.body,temp2.name,dbo.user_info.name AS sender_name,sender,temp2.is_group from
	 (SELECT temp1.chat_id,send_time,temp1.message_id,body,sender,temp1.name,temp1.is_group from
	 (SELECT * FROM #chat_ms,dbo.chat WHERE chat_id=dbo.chat.id)  AS temp1
	  JOIN dbo.messages ON messages.id = temp1.message_id) AS temp2
	  JOIN dbo.user_info ON user_info.id = temp2.sender) AS temp3
	  JOIN user_has_message ON user_has_message.message_id = temp3.message_id AND user_id=@user_id

      --them ten cua chat (neu la group thi lay thuoc tinh name co trong bang chat, neu khong thi lay ten friend tu bang contacts)
	  SELECT chat_id,send_time,message_id,body,IIF(a.name IS NULL,dbo.user_info.name,a.name) AS name,sender,sender_name,is_group,seen_time,contact_id,avatar
	  FROM (SELECT #ch_ms_sd.chat_id,send_time,message_id,body,name,sender,sender_name,is_group,seen_time,user_id AS contact_id
	  FROM #ch_ms_sd LEFT JOIN dbo.user_has_chat ON #ch_ms_sd.is_group=0 and #ch_ms_sd.chat_id=dbo.user_has_chat.chat_id AND user_id<>@user_id) AS a LEFT JOIN dbo.user_info ON user_info.id = a.contact_id
	  ORDER BY a.send_time DESC
END

GO
/****** Object:  StoredProcedure [dbo].[get_contacts]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 CREATE PROC [dbo].[get_contacts]
	@id int,@top INT,@bigthan_id INT,@smallthan_id INT
AS
BEGIN
	IF(@bigthan_id IS NULL)
		SET @bigthan_id =0
	IF(@smallthan_id IS NULL)
		SET @smallthan_id = 999999
	IF(@top IS NULL)
		SET @top = 0

	SELECT id AS contact_id,name,chat_id,avatar
	FROM (SELECT TOP(@top) friend_id,chat_id FROM dbo.contacts 
	WHERE user_id = @id 
	AND status<>-1
	AND id>@bigthan_id
	AND id<@smallthan_id) 
	AS a,dbo.user_info 
	WHERE a.friend_id=dbo.user_info.id AND is_active=1  
END








GO
/****** Object:  StoredProcedure [dbo].[get_file]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[get_file] @id INT
AS
BEGIN
	SELECT * FROM dbo.[file] WHERE id=@id
END

GO
/****** Object:  StoredProcedure [dbo].[get_groups]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[get_groups] 
@user_id INT,@top INT
AS
BEGIN

	--lay danh sach cac chat cua user
	SELECT  * INTO #chat FROM dbo.user_has_chat,dbo.chat 
	WHERE user_id=@user_id
	AND dbo.user_has_chat.chat_id=dbo.chat.id
	AND dbo.chat.is_group=1
	
	SELECT TOP(@top) MAX(user_has_message.message_id) AS message_id,temp.chat_id INTO #chat_ms FROM
	(SELECT dbo.messages.id ,#chat.chat_id,create_date FROM #chat LEFT JOIN dbo.messages 
	ON messages.chat_id = #chat.chat_id) AS temp LEFT JOIN dbo.user_has_message ON user_has_message.message_id = temp.id AND user_id=@user_id
	GROUP BY temp.chat_id


	 SELECT temp3.chat_id,temp3.message_id,temp3.send_time,seen_time,temp3.body,temp3.sender_name,sender,temp3.is_group,temp3.name  FROM
	 (SELECT temp2.chat_id,temp2.send_time,temp2.message_id,temp2.body,temp2.name,dbo.user_info.name AS sender_name,sender,temp2.is_group from
	 (SELECT temp1.chat_id,IIF(send_time IS NULL,temp1.create_date,send_time) AS send_time,temp1.message_id,body,sender,temp1.name,temp1.is_group from
	 (SELECT * FROM #chat_ms,dbo.chat WHERE chat_id=dbo.chat.id)  AS temp1
	  LEFT JOIN dbo.messages ON messages.id = temp1.message_id) AS temp2
	  LEFT JOIN dbo.user_info ON user_info.id = temp2.sender) AS temp3
	  LEFT JOIN user_has_message ON user_has_message.message_id = temp3.message_id AND user_id=@user_id
	  ORDER BY temp3.send_time DESC
END

GO
/****** Object:  StoredProcedure [dbo].[get_groups_range]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[get_groups_range] @user_id INT,@top INT,@bigthan_ms_id INT,@smallthan_ms_id INT
AS
BEGIN
	IF(@bigthan_ms_id IS NULL)
		SET @bigthan_ms_id =0
	IF(@smallthan_ms_id IS NULL)
		SET @smallthan_ms_id = 999999
	IF(@top IS NULL)
		SET @top = 0

	--lay danh sach cac chat cua user
	SELECT  * INTO #chat FROM dbo.user_has_chat,dbo.chat 
	WHERE user_id=@user_id
	AND dbo.user_has_chat.chat_id=dbo.chat.id
	AND dbo.chat.is_group=1
	
	SELECT TOP(@top) MAX(temp.id) AS message_id,temp.chat_id INTO #chat_ms FROM
	(SELECT dbo.messages.id ,#chat.chat_id,create_date FROM #chat LEFT JOIN dbo.messages 
	ON messages.chat_id = #chat.chat_id
	AND dbo.messages.id>@bigthan_ms_id
	AND dbo.messages.id<@smallthan_ms_id) AS temp JOIN dbo.user_has_message ON user_has_message.message_id = temp.id
	GROUP BY temp.chat_id


	 SELECT temp3.chat_id,temp3.message_id,temp3.send_time,seen_time,temp3.body,temp3.sender_name,sender,temp3.is_group,temp3.name  FROM
	 (SELECT temp2.chat_id,temp2.send_time,temp2.message_id,temp2.body,temp2.name,dbo.user_info.name AS sender_name,sender,temp2.is_group from
	 (SELECT temp1.chat_id,IIF(send_time IS NULL,temp1.create_date,send_time) AS send_time,temp1.message_id,body,sender,temp1.name,temp1.is_group from
	 (SELECT * FROM #chat_ms,dbo.chat WHERE chat_id=dbo.chat.id)  AS temp1
	  LEFT JOIN dbo.messages ON messages.id = temp1.message_id) AS temp2
	  LEFT JOIN dbo.user_info ON user_info.id = temp2.sender) AS temp3
	  LEFT JOIN user_has_message ON user_has_message.message_id = temp3.message_id AND user_id=@user_id
	  ORDER BY message_id DESC
END

GO
/****** Object:  StoredProcedure [dbo].[get_info]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[get_info] @id INT,@id2 int
AS
BEGIN
	
	SELECT info.id,name,user_name AS username,sex,birthday,email,phone,avatar,chat_id
	FROM (SELECT * FROM dbo.user_info WHERE id=@id2) AS info LEFT JOIN (SELECT * FROM dbo.contacts WHERE user_id=@id AND friend_id=@id2) AS ct
	ON ct.friend_id = info.id
END







GO
/****** Object:  StoredProcedure [dbo].[get_messages]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[get_messages] @chat_id INT,@user_id INT,@top INT,@bigthan_ms_id INT,@smallthan_ms_id INT
AS
BEGIN
	IF(@bigthan_ms_id IS NULL)
		SET @bigthan_ms_id =0
	IF(@smallthan_ms_id IS NULL)
		SET @smallthan_ms_id = 999999
	IF(@top IS NULL)
		SET @top = 0

	SELECT TOP(@top) message_id,body,send_time,seen_time,sender,name,file_id FROM 
	(SELECT * FROM dbo.messages WHERE chat_id=@chat_id AND is_deleted=0 ) AS ms,dbo.user_has_message ,dbo.user_info
	WHERE ms.id=dbo.user_has_message.message_id AND
	user_id=@user_id AND 
	ms.sender=dbo.user_info.id and
    ms.id>@bigthan_ms_id AND
    ms.id<@smallthan_ms_id

END






GO
/****** Object:  StoredProcedure [dbo].[gr_add_mb]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[gr_add_mb] @chat_id INT,@user_id int,@user_id_add INT
AS
BEGIN
	DECLARE @a INT
	SELECT @a=is_group FROM dbo.chat WHERE dbo.chat.id=@chat_id
	IF(@a<>1)
	RETURN 0
	SELECT @a=COUNT(*) FROM dbo.user_has_chat WHERE chat_id=@chat_id AND user_id=@user_id
	IF(@a<>1)
	RETURN 0
	SELECT @a=COUNT(*) FROM dbo.user_has_chat WHERE chat_id=@chat_id AND user_id=@user_id_add
	IF(@a=1)
	RETURN 0
	
	INSERT INTO dbo.user_has_chat
	        ( user_id,chat_id, status, join_date )
	VALUES  ( @user_id_add,
			  @chat_id, -- chat_id - int
	          0, -- chat_status - int
	          GETDATE()  -- join_date - datetime
	          )
	RETURN 1
END

GO
/****** Object:  StoredProcedure [dbo].[gr_dl_mb]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[gr_dl_mb] @chat_id int,@user_id INT,@user_id_del INT
AS
BEGIN
	DECLARE @a INT
	SELECT @a=is_group FROM dbo.chat WHERE dbo.chat.id=@chat_id
	IF(@a<>1) 
		RETURN 0
	SELECT @a=status FROM dbo.user_has_chat WHERE user_id=@user_id AND chat_id=@chat_id
	IF(@a=null)
		RETURN 0
	IF(@user_id=@user_id_del)
		SET @a=2
	IF(@a>0)
		DELETE dbo.user_has_chat WHERE chat_id=@chat_id AND user_id=@user_id_del
	RETURN 1

END

GO
/****** Object:  StoredProcedure [dbo].[gr_members]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[gr_members] @id INT,@chat_id INT
AS
BEGIN
	DECLARE @a INT
	SELECT @a=COUNT(*) FROM dbo.user_has_chat WHERE user_id=@id AND chat_id=@chat_id
	IF(@a=0)
		RETURN 0
	
	SELECT name,user_id,user_name,avatar,dbo.user_info.id AS contact_id FROM dbo.user_has_chat,dbo.user_info WHERE chat_id=@chat_id AND dbo.user_has_chat.user_id=dbo.user_info.id

END

GO
/****** Object:  StoredProcedure [dbo].[new_chat]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[new_chat] @user_id int,@name NVARCHAR(50),@is_group bit
AS
BEGIN
	DECLARE @chat_id INT
    
	INSERT INTO dbo.chat
	        ( name ,
	          is_group ,
	          create_date ,
	          is_deleted
	        )
	VALUES  ( @name , -- name - nvarchar(50)
	          @is_group , -- is_group - bit
	          GETDATE() , -- create_date - datetime
	          0  -- is_deleted - bit
	        )
	SET @chat_id= SCOPE_IDENTITY()
	IF(@chat_id IS NULL)
	RETURN 0
	INSERT INTO dbo.user_has_chat
			([user_id], chat_id, [status], join_date )
	VALUES  ( @user_id,
				@chat_id, -- chat_id - int
				1, -- chat_status - int
				GETDATE()  -- join_date - datetime
				)
	RETURN @chat_id
END


GO
/****** Object:  StoredProcedure [dbo].[rename]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[rename] @chatid INT,@userid INT,@name NVARCHAR(50)
AS
BEGIN
	DECLARE @a INT
	SELECT @a=COUNT(*) FROM dbo.user_has_chat WHERE user_id=@userid AND chat_id=@chatid
	IF(@a=0) RETURN 0
	UPDATE dbo.chat SET name = @name FROM dbo.chat,dbo.user_has_chat 
	WHERE chat_id=dbo.chat.id AND user_id=@userid AND chat_id=@chatid
	RETURN 1
END

GO
/****** Object:  StoredProcedure [dbo].[search]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[search] @id int,@input NVARCHAR(50),@top int
AS
BEGIN
	SELECT * INTO #us FROM dbo.user_info WHERE (name LIKE '%'+@input+'%' OR user_name LIKE @input) AND id<>@id
	SELECT #us.id,name,sex,avatar,chat_id,user_name INTO #ct FROM #us LEFT JOIN dbo.contacts ON contacts.friend_id = #us.id AND contacts.user_id = @id
	SELECT TOP(@top) id,name,sex,avatar,user_name FROM #ct WHERE chat_id IS NULL 
END





GO
/****** Object:  StoredProcedure [dbo].[seen]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[seen] @id1 INT ,@chat_id INT 
AS
BEGIN

	UPDATE dbo.user_has_message
	SET seen_time =GETDATE()
	FROM dbo.messages,dbo.user_has_message
	WHERE  dbo.messages.chat_id=@chat_id AND user_id =@id1 
	AND cast (seen_time as varchar) IS NULL
END




GO
/****** Object:  StoredProcedure [dbo].[send_file]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[send_file]  @user_id INT,@chat_id INT,@body NVARCHAR(200),@f_name NVARCHAR(200),@f_path NVARCHAR(500),@f_type NVARCHAR(50)
AS 
BEGIN
	SET NOCOUNT ON
   	DECLARE @a INT,@file_id int
	DECLARE @msid INT
	SELECT @a=COUNT(*) FROM dbo.user_has_chat
	WHERE dbo.user_has_chat.user_id=@user_id 
	AND dbo.user_has_chat.chat_id=@chat_id
	AND dbo.user_has_chat.status <>-1
	IF(@a=0)RETURN 0

	SET @file_id=0
	EXEC @file_id=dbo.up_file @name = @f_name, -- nvarchar(200)
	    @path = @f_path, -- nvarchar(500)
	    @type = @f_type, -- nvarchar(50)
		@user = @user_id
	IF(@file_id=0) RETURN 0

	INSERT dbo.messages
		    ( chat_id ,
		        body ,
		        send_time ,
		        sender ,
		        is_deleted,
				file_id
		    )
	VALUES  (	@chat_id , -- chat_id - int
		        @body , -- body - nvarchar(500)
		        GETDATE() , -- send_time - datetime
		        @user_id , -- sender - int
		        0,  -- is_deleted - bit
				@file_id
		    )
	SET @msid=SCOPE_IDENTITY()
	SELECT user_id,ROW_NUMBER() OVER(ORDER BY user_id ASC) AS Row# INTO #users FROM dbo.chat,dbo.user_has_chat WHERE dbo.chat.id=dbo.user_has_chat.chat_id and dbo.chat.id=@chat_id
	DECLARE @l INT,@i INT,@usid INT,@s DATETIME
	SELECT TOP(1) @l=Row# FROM #users ORDER BY Row# DESC
	SET @i=1
	WHILE @i<=@l
	BEGIN
		SELECT @usid=user_id FROM #users WHERE Row#=@i
		IF(@usid=@user_id)
			SET @s=GETDATE()
		ELSE
			SET @s=NULL
		INSERT dbo.user_has_message
			    ( user_id ,
			        message_id ,
			        seen_time 
			    )
		VALUES  ( @usid , -- user_id - int
			        @msid , -- message_id - int
			        @s  -- seen_time - datetime
			    )
			       
		SET @i=@i+1
	END 
	SELECT dbo.messages.id AS message_id,body,send_time,GETDATE() AS seen_time,sender,name,file_id FROM dbo.messages,dbo.user_info WHERE dbo.messages.id=@msid AND dbo.messages.sender=dbo.user_info.id
	RETURN @file_id
END

GO
/****** Object:  StoredProcedure [dbo].[up_file]    Script Date: 3/8/2019 11:44:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[up_file] @name NVARCHAR(200),@path NVARCHAR(500),@type NVARCHAR(50),@user int
AS
BEGIN
	INSERT INTO dbo.[file]
	        ( file_name ,
	          file_path ,
	          file_type ,
	          owner
	        )
	VALUES  ( @name , -- file_name - nvarchar(200)
	          @path , -- file_path - nvarchar(500)
	          @type , -- file_type - nvarchar(50)
	          @user  -- owner - int
	        )
	RETURN SCOPE_IDENTITY()
END

GO
USE [master]
GO
ALTER DATABASE [webchat1] SET  READ_WRITE 
GO
