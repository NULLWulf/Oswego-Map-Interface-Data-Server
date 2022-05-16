package edu.oswegofs.mapdataserver;

import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "Property")
public class Property {

    @Id
    @Column(name = "BuildingNumber")
    String id;

    @Column(name = "Latitude")
    Float Latitude;

    @Column(name = "Longitude")
    Float Longitude;

    @Column(name = "Name")
    String Namex;

    @Column(name = "BuildAbr")
    String BuildrAbr;

    @Column(name = "Address")
    String Address;

    @Column(name = "SquareFt")
    Long SquareFt;

    @Column(name = "AssetId")
    Long AssetId;

    public String getLatLong(){
        return "[" + this.getLatitude() + "," + this.getLongitude() + "]";
    }
}
