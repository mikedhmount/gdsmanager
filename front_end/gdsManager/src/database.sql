CREATE DATABASE gds_manager;

USE DATABASE gds_manager;


--      Holidays

CREATE TABLE tbl_Holidays(
    holiday_id int not null primary key,
    holiday_name varchar(50) not null,
    holiday_start DATE,
    holiday_end DATE
);
INSERT INTO tbl_Holidays(
    holiday_id,
    holiday_name
)
VALUES 
(15250, "holiday1"),
(15251, "holiday2"),
(15252, "holiday3"),
(15253, "holiday4"),
(15254, "holiday5"),
(15255, "holiday6"),
(15256, "holiday7"),
(15257, "holiday8"),
(15258, "holiday9"),
(15259, "holiday10");

--      Groups 

CREATE TABLE tbl_Groups(
    group_id int auto_increment not null primary key,
    group_name varchar(100) not null,
    sched_id int not null
);

--      Shedules

CREATE TABLE tbl_Schedules(
    schedule_id int not null primary key,
    schedule_name varchar(100) not null,
    monday_start TIME,
    monday_end TIME,
    tuesday_start TIME,
    tuesday_end TIME,
    wednesday_start TIME,
    wednesday_end TIME,
    thursday_start TIME,
    thursday_end TIME,
    friday_start TIME,
    friday_end TIME,
    saturday_start TIME,
    saturday_end TIME,
    sunday_start TIME,
    sunday_end TIME,
    holidays boolean default 0
);
INSERT INTO tbl_Schedules(
    schedule_id, schedule_name, monday_start, monday_end, tuesday_start, tuesday_end, 
    wednesday_start, wednesday_end, thursday_start, thursday_end, friday_start, friday_end,
    saturday_start, saturday_end, sunday_start, sunday_end
)
VALUES
(15200, "schedule_1", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"),
(15200, "schedule_2", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"),
(15200, "schedule_3", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"),
(15200, "schedule_4", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"),
(15200, "schedule_1", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"),
(15200, "schedule_1", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"),
(15200, "schedule_1", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"),
(15200, "schedule_1", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"),
(15200, "schedule_1", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00"),
(15200, "schedule_1", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00", "00:00:00");


--      Members




--      User



--      Readers




--      Cards



--      Apply

CREATE TABLE tbl_Apply(
    id int not null auto_increment primary key,
    reader_id int not null,
    reader_ip varchar(15),
    reader_port varchar(5),
    command varchar(200),
    command_type int
);