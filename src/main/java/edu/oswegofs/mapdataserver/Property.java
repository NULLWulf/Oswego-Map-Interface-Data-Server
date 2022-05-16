package edu.oswegofs.mapdataserver;

import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "property")
public class Property {

    @Id
    @Column(name = "building_code")
    String building_code;

    @Column(name = "latitude")
    Float latitude;

    @Column(name = "longitude")
    Float longitude;

    @Column(name = "name")
    String name;

    @Column(name = "build_abr")
    String build_abr;

    @Column(name = "address")
    String address;

    @Column(name = "square_ft")
    Long square_ft;

    @Column(name = "asset_id")
    Long asset_id;

    public String getLatLong(){
        return "[" + this.getLatitude() + "," + this.getLongitude() + "]";
    }
}
