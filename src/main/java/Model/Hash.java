package Model;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.security.MessageDigest;

import javax.xml.bind.DatatypeConverter;

public enum Hash {

    MD5("MD5"),
    SHA1("SHA1"),
    SHA256("SHA-256"),
    SHA512("SHA-512");

    private String name;

    Hash(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public String checksum(File input) {
        try{
        	InputStream in = new FileInputStream(input);
            MessageDigest digest = MessageDigest.getInstance(getName());
            byte[] block = new byte[4096];
            int length;
            while ((length = in.read(block)) > 0) {
                digest.update(block, 0, length);
            }
            in.close();
            return DatatypeConverter.printHexBinary(digest.digest());
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    
}