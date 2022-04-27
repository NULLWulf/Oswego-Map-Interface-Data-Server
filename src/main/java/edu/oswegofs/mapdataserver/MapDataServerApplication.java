package edu.oswegofs.mapdataserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MapDataServerApplication implements CommandLineRunner {

    @Autowired
    AssetInterface assetRepo;

    public static void main(String[] args)  {
        SpringApplication.run(MapDataServerApplication.class, args);
    }

    @Override
    public void run(String... args){

//        assetRepo.findAll().forEach(System.out::println);

        assetRepo.findByassetType("HVAC").forEach(x -> System.out.println(x));


    }
}
