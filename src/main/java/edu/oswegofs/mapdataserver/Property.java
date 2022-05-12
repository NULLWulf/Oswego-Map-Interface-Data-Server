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
    String BuildingNumber;

    Float Latitude;

    Float Longitude;

    String name;

    String BuildrAbr;

    String Address;

    Long SquareFt;

    Long AssetId;

    public String getLatLong(){
        return "[" + this.getLatitude() + "," + this.getLongitude() + "]";
    }
}
