package Model;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class Authentication {
	
	private static String privatekey="eyJqdGkiOiIxMjIxIiwiaWF0IjoxNTQxNDA1MDUzLCJzdWIiOiJ0cnVuZyIsImlzcyI6ImR0dHIiLCJ";
	private static byte[] key=DatatypeConverter.parseBase64Binary(privatekey);
	private static SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
	private static Key signingKey=new SecretKeySpec(key, signatureAlgorithm.getJcaName());;
	

	public static String createJWT(String id, String issuer, String subject, long ttlMillis) {
		long nowMillis = System.currentTimeMillis();
	    Date now = new Date(nowMillis);
		//Let's set the JWT Claims
	    JwtBuilder builder = Jwts.builder().setId(id)
	                                .setIssuedAt(now)
	                                .setSubject(subject)
	                                .setIssuer(issuer)
	                                .signWith(signatureAlgorithm, signingKey);
	 
	    //if it has been specified, let's add the expiration
	    if (ttlMillis >= 0) {
	    long expMillis = nowMillis + ttlMillis;
	        Date exp = new Date(expMillis);
	        builder.setExpiration(exp);
	    }
	 
	    //Builds the JWT and serializes it to a compact, URL-safe string
	    return builder.compact();
	}
	public static String createJWT(String id) {
	    JwtBuilder builder = Jwts.builder().setId(id)
	                                .signWith(signatureAlgorithm, signingKey);
	    return builder.compact();
	}
	
	public static Claims decodeJWT(String encode){
		return Jwts.parser()
				.setSigningKey(key)
				.parseClaimsJws(encode).getBody();
	}
	public static String getId(String encode) {
		return decodeJWT(encode).getId();
	}
}
