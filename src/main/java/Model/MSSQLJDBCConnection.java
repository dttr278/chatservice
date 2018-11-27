/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author DO TAN TRUNG
 */
public class MSSQLJDBCConnection {
   // static String url="jdbc:sqlserver://127.0.0.1:1433;databaseName=webchat1;user=sa;password=123456";
    static String url="jdbc:sqlserver://den1.mssql7.gear.host;databaseName=webchat1;user=webchat1;password=Ev4x9?3XI7x!";
    public static Connection getJDBCConnection(){
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            return DriverManager.getConnection(url);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(MSSQLJDBCConnection.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(MSSQLJDBCConnection.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

 
    
}
