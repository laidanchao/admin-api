
insert into crm_client (client_name,client_type,phone,create_by,update_by) values
('LDC','PERSONAL','15000000000','LDC','LDC'),
('DD','PERSONAL','13500000000','LDC','LDC'),
('xxx','PERSONAL','15111111111','LDC','LDC'),
('yyy','PERSONAL','13700000000','LDC','LDC');

insert into sys_dept (name,parent_id,mpath,create_by,update_by) values
('XX公司',null,'1.','LDC','LDC'),
('销售部',1,'1.2.','LDC','LDC'),
('销售1组',2,'1.2.3.','LDC','LDC'),
('客服部',1,'1.4.','LDC','LDC'),
('客服1组',4,'1.4.5.','LDC','LDC');

insert into sys_user (username,password,user_no,nickname,dept_id,create_by,update_by) values
('laidanchao','123','001','ldc',1,'LDC','LDC'),
('zhangsan','321','002','张三',3,'LDC','LDC'),
('lisi','456','003','李四',5,'LDC','LDC'),
('wangwu','654','004','王五',5,'LDC','LDC');

insert into sys_role (name,code,create_by,update_by) values
('超级管理员','ADMIN','LDC','LDC'),
('总经理','MANAGER','LDC','LDC'),
('销售部经理','SALE_MANAGER','LDC','LDC'),
('销售组长','SALE_LEADER','LDC','LDC'),
('销售员','SALE_PERSON','LDC','LDC'),
('客服部经理','CUSTOMER_MANAGER','LDC','LDC'),
('客服','CUSTOMER_PERSON','LDC','LDC');

insert into sys_menu (name,parent_id,type,create_by,update_by) values
('系统管理',null,'MENU','LDC','LDC'),
('用户管理',1,'PAGE','LDC','LDC'),
('角色管理',1,'PAGE','LDC','LDC'),
('菜单管理',1,'PAGE','LDC','LDC'),
('部门管理',1,'PAGE','LDC','LDC'),
('客户管理',null,'MENU','LDC','LDC'),
('客户列表',6,'PAGE','LDC','LDC');

insert into sys_user_roles (user_id,role_id) values
(1,1),
(2,5),
(3,7);

insert into sys_role_menus (role_id,menu_id) values
(2,1),
(2,2),
(2,4),
(2,5),
(2,6),
(2,7),
(4,6),
(4,7);


