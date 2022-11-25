package com.examly.springapp.services.Impl;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Service;

import com.examly.springapp.services.SmsService;

@Service
public class SmsServiceImpl implements SmsService{

	@Override
	public void sendSms(String message, String number) {
			try
			{
			
			String apiKey="LqoWnZXFMvfYO8Q1pAExScalByCHPwr3KNdust6VD9zkgRiI0eYOQyNJ8DsH1oALFzVkPMgB0SplG2Wb";
			String sendId="TXTIND";
			//important step...
			message=URLEncoder.encode(message, "UTF-8");
			String language="english";
			
			String route="v3";
			
			
			String myUrl="https://www.fast2sms.com/dev/bulkV2?authorization="+apiKey+"&sender_id="+sendId+"&message="+message+"&route="+route+"&numbers="+number;
			
			
			URL url=new URL(myUrl);
			
			HttpsURLConnection con=(HttpsURLConnection)url.openConnection();
			
			
			con.setRequestMethod("GET");
			
			con.setRequestProperty("User-Agent", "Mozilla/5.0");
			con.setRequestProperty("cache-control", "no-cache");
			
			int code=con.getResponseCode();
			
			StringBuffer response=new StringBuffer();
			
			BufferedReader br=new BufferedReader(new InputStreamReader(con.getInputStream()));
			
			while(true)
			{
				String line=br.readLine();
				System.out.println(line);
				if(line==null)
				{
					break;
				}
				response.append(line);
			}
			
			}catch (Exception e) {
				e.printStackTrace();
			}
		
	}

}
