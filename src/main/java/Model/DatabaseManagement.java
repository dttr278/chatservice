/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.logging.Level;
import java.util.logging.Logger;


/**
 *
 * @author DO TAN TRUNG
 */
public class DatabaseManagement {
    public static Connection con=MSSQLJDBCConnection.getJDBCConnection();
    public static int checkLogin(String username,String password){
    	 String sql="{? = call check_login(?,?)}";
         int id=0;
    	 try {
    		if(con==null)con=MSSQLJDBCConnection.getJDBCConnection();
            CallableStatement cstm=con.prepareCall(sql);

            cstm.registerOutParameter(1, Types.INTEGER);
            cstm.setString(2, username);
            cstm.setString(3, password);
            cstm.executeQuery();
            id=cstm.getInt(1);
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
    	 return id;
    }

    public static String getInfo(int id,int id2) {
        String sql="{call get_info(?,?)}";
        
        CallableStatement cstm;
        ResultSet rs=null;
		try {
			cstm = con.prepareCall(sql);
			 cstm.setInt(1, id);
			 cstm.setInt(2, id2);
		   rs =cstm.executeQuery();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
        return JsonServices.convertToJSONObj(rs);
    }

     public static String getContacts(String id,String top,String bigthan,String smallthan){
        String str="{call get_contacts (?,?,?,?)}";
        ResultSet rs=null;
        try {
            CallableStatement cstm=con.prepareCall(str);
            cstm.setInt(1, Integer.valueOf(id));
            cstm.setInt(2, Integer.valueOf(top));
            cstm.setString(3,bigthan);
            cstm.setString(4, smallthan);
            rs=cstm.executeQuery(); 
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return JsonServices.convertToJSON(rs);
    }
    public static int seen(String id1,String chatId){
     String str="{call seen (?,?)}";
     try {
         CallableStatement cstm=con.prepareCall(str);
         cstm.setInt(1, Integer.valueOf(id1));
         cstm.setInt(2,Integer.valueOf(chatId));
        return cstm.executeUpdate();
     } catch (SQLException ex) {
         Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
     } catch (Exception ex) {
         Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
     }
     return -1;
    }
    public static String search(int id,String name,int top){
        String str="{call search (?,?,?)}";
        ResultSet rs=null;
        try {
            CallableStatement cstm=con.prepareCall(str);
            cstm.setInt(1, id);
            cstm.setString(2, name);
            cstm.setInt(3, top);
            rs=cstm.executeQuery();
           
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return JsonServices.convertToJSON(rs);
    }
    public static String getChats(String id,String top,String bigthan,String smallthan){
        String str="{call get_chats (?,?,?,?)}";
        ResultSet rs=null;
        try {
            CallableStatement cstm=con.prepareCall(str);
            cstm.setInt(1, Integer.valueOf(id));
            cstm.setInt(2, Integer.valueOf(top));
            cstm.setString(3,bigthan);
            cstm.setString(4, smallthan);
            rs=cstm.executeQuery();
            
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return JsonServices.convertToJSON(rs);
    }
    public static void close(){
        try {
            con.close();
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    // 0: chua co 1: co -1: loi
    public static int checkUserName(String userName) {
    	String str="exec check_user_name @user_name=N'"+userName+"'";
    	Statement statement;
            try {
                statement = con.createStatement();
                ResultSet rs=statement.executeQuery(str);
                if(rs.next())
                    return rs.getInt(1);
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
    	return -1;
    }
    
    // 0: chua co 1: co -1: loi
    public static int checkEmail(String email) {
    	String str="exec check_email @email=N'"+email+"'";
    	Statement statement;
            try {
                statement = con.createStatement();
                ResultSet rs=statement.executeQuery(str);
                if(rs.next())
                    return rs.getInt(1);
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
    	return -1;
    }
    
    // 0: chua co 1: co -1: loi
    public static int checkPhone(String phone) {
    	String str="exec check_phone @phone="+phone;
    	Statement statement;
            try {
                statement = con.createStatement();
                ResultSet rs=statement.executeQuery(str);
                if(rs.next())
                return rs.getInt(1);
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
    	return -1;
    }
    
    // 0: chua co 1: co -1: loi
    public static int createUser(String userName,String password,String name,String sex, String email,String birthday,String phone) {
    	if(userName.isEmpty()||password.isEmpty()||name.isEmpty()||email.isEmpty())
            return -1;
    	String s="{? = call create_user (?,?,?,?,?,?,?)}";
    	try {
			CallableStatement cstm=con.prepareCall(s);
			cstm.registerOutParameter(1, Types.INTEGER);
			cstm.setString(2, userName);
			cstm.setString(3, password);
			cstm.setString(4, name);
			cstm.setString(5, sex);
			cstm.setString(6, email);
			cstm.setString(7, birthday);
			cstm.setString(8, phone);
			cstm.execute();
			return cstm.getInt(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
           	return -1;
    } 
    
    public static int addContact(String id,String id2) {
    	String sql="{call add_contact (?,?)}";
    	try {
            CallableStatement cstm= con.prepareCall(sql);
            cstm.setInt(1, Integer.valueOf(id));
            cstm.setInt(2, Integer.valueOf(id2)); 
            return cstm.executeUpdate();
        } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
        }
    	return -1;
    }
    
    public static String addMessage(String id,String chatId,String ms) {
    	String sql="{call add_ms (?,?,?)}";
    	 ResultSet rs=null;
    	try {
    		 CallableStatement cstm= con.prepareCall(sql);
    		 cstm.setInt(1, Integer.valueOf(id));
             cstm.setInt(2, Integer.valueOf(chatId)); 
             cstm.setString(3, ms);
             rs=cstm.executeQuery();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return JsonServices.convertToJSONObj(rs);
    }
    public static String getMessages(String chatId,String id,String top,String bigthan,String smallthan){
        String str="{call get_messages (?,?,?,?,?)}";
        ResultSet rs=null;
        try {
            CallableStatement cstm=con.prepareCall(str);
            cstm.setInt(1, Integer.valueOf(chatId));
            cstm.setInt(2, Integer.valueOf(id));
            cstm.setInt(3, Integer.valueOf(top));
            cstm.setString(4,bigthan);
            cstm.setString(5, smallthan);
            rs=cstm.executeQuery();
            return JsonServices.convertToJSON(rs);
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return JsonServices.convertToJSON(rs);
    }
    
    public static int deleteMs(String id,String msid) {
    	String sql="{call delete_ms (?,?)}";
    	try {
            CallableStatement cstm= con.prepareCall(sql);         
            cstm.setInt(1, Integer.valueOf(id));
            cstm.setInt(2, Integer.valueOf(msid));
            
            return cstm.executeUpdate();
        } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
        }
    	return -1;
    }
    
    public static String getGroups(String id,String top){
        String str="{call get_groups (?,?)}";
        ResultSet rs=null;
        try {
            CallableStatement cstm=con.prepareCall(str);
            cstm.setInt(1, Integer.valueOf(id));
            cstm.setInt(2, Integer.valueOf(top));
            rs=cstm.executeQuery();      
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return JsonServices.convertToJSON(rs);
    }
    public static String getGroupsMember(String id,String grId){
        String str="{call gr_members (?,?)}";
        ResultSet rs=null;
        try {
            CallableStatement cstm=con.prepareCall(str);
            cstm.setInt(1, Integer.valueOf(id));
            cstm.setInt(2, Integer.valueOf(grId));
            rs=cstm.executeQuery();      
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return JsonServices.convertToJSON(rs);
    }
    public static String getGroups(String id,String top,String bigthan,String smallthan){
        String str="{call get_groups_range (?,?,?,?)}";
        ResultSet rs=null;
        try {
            CallableStatement cstm=con.prepareCall(str);
            cstm.setInt(1, Integer.valueOf(id));
            cstm.setInt(2, Integer.valueOf(top));
            cstm.setString(3,bigthan);
            cstm.setString(4, smallthan);
            rs=cstm.executeQuery();
            
        } catch (SQLException ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(DatabaseManagement.class.getName()).log(Level.SEVERE, null, ex);
        }
        return JsonServices.convertToJSON(rs);
    }
    public static int addGroupMember(String chatId,String id,String addId) {
    	String sql="{?=call gr_add_mb (?,?,?)}";
    	try {
    		 CallableStatement cstm= con.prepareCall(sql);
    		 cstm.registerOutParameter(1, Types.INTEGER);
    		 cstm.setInt(2, Integer.valueOf(chatId));
             cstm.setInt(3, Integer.valueOf(id)); 
             cstm.setInt(4, Integer.valueOf(addId));
			 cstm.executeUpdate();
			 return cstm.getInt(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return -1;
    }
    public static int deleteGroupMember(String chatId,String id,String dlId) {
    	String sql="{?=call gr_dl_mb (?,?,?)}";
    	try {
    		 CallableStatement cstm= con.prepareCall(sql);
    		 cstm.registerOutParameter(1, Types.INTEGER);
    		 cstm.setInt(2, Integer.valueOf(chatId));
             cstm.setInt(3, Integer.valueOf(id)); 
             cstm.setInt(4, Integer.valueOf(dlId));
			 cstm.executeUpdate();
			 return cstm.getInt(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return -1;
    }
    public static int newGroup(String userId,String name) {
    	String sql="{?=call new_chat (?,?,?)}";
    	try {
    		 CallableStatement cstm= con.prepareCall(sql);
    		 cstm.registerOutParameter(1, Types.INTEGER);
    		 cstm.setInt(2, Integer.valueOf(userId));
             cstm.setString(3, name); 
             cstm.setInt(4, 1);
			 cstm.executeUpdate();
			 return cstm.getInt(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return -1;
    }
    public static int renameChat(String userId,String chatId,String name) {
    	String sql="{call rename (?,?,?)}";
    	try {
    		 CallableStatement cstm= con.prepareCall(sql);
    		 cstm.setInt(1, Integer.valueOf(chatId));
             cstm.setInt(2, Integer.valueOf(userId)); 
             cstm.setString(3, name);
			 
			 return cstm.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return -1;
    }
    
//    public static int upFile(String name,String path,String type) {
//    	String sql="{?=call up_file (?,?,?)}";
//    	try {
//    		 CallableStatement cstm= con.prepareCall(sql);
//    		 cstm.registerOutParameter(1, Types.INTEGER);
//    		 cstm.setString(2, name);
//             cstm.setString(3, path); 
//             cstm.setString(4, type);
//			 cstm.executeUpdate();
//			 return cstm.getInt(1);
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//    	return -1;
//    }
    public static MyFile getFile(int id) {
    	String sql="{call get_file (?)}";
    	try {
    		 CallableStatement cstm= con.prepareCall(sql);
    		 cstm.setInt(1, id);
			 ResultSet rs=cstm.executeQuery();
			 MyFile mf=new MyFile();
			 rs.next();
			 mf.setName(rs.getString(2));
			 mf.setPath(rs.getString(3));
			 mf.setType(rs.getString(4));
			 return mf;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return null;
    }
    public static int changeAvatar(int id,MyFile mf) {
    	String sql="{?=call change_avatar (?,?,?,?)}";
    	try {
    		 CallableStatement cstm= con.prepareCall(sql);
    		 cstm.registerOutParameter(1, Types.INTEGER);
    		 cstm.setInt(2, id);
             cstm.setString(3, mf.getName()); 
             cstm.setString(4, mf.getPath()); 
             cstm.setString(5, mf.getType()); 
             cstm.executeUpdate();
			 return cstm.getInt(1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return -1;
    }
    public static String sendFile(int id,int id2,String body,MyFile mf) {
    	String sql="{call send_file (?,?,?,?,?,?)}";
    	ResultSet rs=null;
    	try {
    		 CallableStatement cstm= con.prepareCall(sql);
    		 cstm.setInt(1, id);
             cstm.setInt(2, id2); 
             cstm.setString(3, body);
             cstm.setString(4, mf.getName());
             cstm.setString(5, mf.getPath());
             cstm.setString(6, mf.getType());
			 rs=cstm.executeQuery();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return JsonServices.convertToJSONObj(rs);
    }
//    public static void main(String[] args) {
//    	con=MSSQLJDBCConnection.getJDBCConnection();
//    	MyFile a=DatabaseManagement.getFile(4);
//		System.out.println(a);
//	}
}
