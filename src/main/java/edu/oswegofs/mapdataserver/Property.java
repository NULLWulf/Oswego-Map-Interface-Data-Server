package edu.oswegofs.mapdataserver;

import com.sun.istack.NotNull;
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
    Long id;

    @Column(name = "BuildingCode")
    String buildingCode;

    @Column(name = "Latitude")
    Float latitude;

    @Column(name = "Longitude")
    Float longitude;

    @Column(name = "BuildingName")
    String buildingName;

    @Column(name = "BuildAbr")
    String buildAbr;

    @Column(name = "Address")
    String address;

    @Column(name = "SquareFt")
    Long squareFt;

    public String getLatLong(){
        return "[" + this.getLatitude() + "," + this.getLongitude() + "]";
    }
}
