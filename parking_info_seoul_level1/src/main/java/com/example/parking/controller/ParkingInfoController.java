package com.example.parking.controller;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
public class ParkingInfoController {

    @GetMapping("/api/parking")
    public List<Map<String, Object>> getParkingData() {
        String apiKey = "684464724674733338316b785a7542";
        String url = "http://openapi.seoul.go.kr:8088/" + apiKey + "/json/GetParkInfo/1/1000";

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        JSONObject json = new JSONObject(response);
        JSONArray rows = json.getJSONObject("GetParkInfo").getJSONArray("row");

        List<Map<String, Object>> result = new ArrayList<>();

        for (int i = 0; i < rows.length(); i++) {
            JSONObject item = rows.getJSONObject(i);

            String weekday = item.optString("WD_OPER_BGNG_TM", "") + " ~ " + item.optString("WD_OPER_END_TM", "") + " (평일)";
            String weekend = item.optString("WE_OPER_BGNG_TM", "") + " ~ " + item.optString("WE_OPER_END_TM", "") + " (주말)";
            String parkingHour = weekday + ", " + weekend;

            int baseTime = item.optInt("PRK_HM", 0);
            int baseFee = item.optInt("PRK_CRG", 0);
            int addTime = item.optInt("ADD_UNIT_TM_MNT", 0);
            int addFee = item.optInt("ADD_CRG", 0);
            int totalCount = item.optInt("TPKCT", -1); // ✅ 총 주차면

            String payInfo = "정보 없음";
            if (baseTime > 0 && baseFee > 0 && addTime > 0 && addFee > 0) {
                payInfo = String.format("기본 %d분 %d원, 이후 %d분당 %d원", baseTime, baseFee, addTime, addFee);
            }

            Map<String, Object> parkingMap = new LinkedHashMap<>();
            parkingMap.put("addr", item.optString("ADDR", "정보 없음"));
            parkingMap.put("Info_level", "1");
            parkingMap.put("parkingHour", parkingHour);
            parkingMap.put("stationName", item.optString("PKLT_NM", "정보 없음"));
            parkingMap.put("parkingPay", baseFee);
            parkingMap.put("payInfo", payInfo);
            parkingMap.put("totalParkingSpaces", totalCount); // ✅ 총 주차면 추가

            result.add(parkingMap);
        }

        return result;
    }
}

