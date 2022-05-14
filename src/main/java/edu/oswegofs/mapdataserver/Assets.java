package edu.oswegofs.mapdataserver;


import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
@Table(name = "assets")
public class Assets {

    @Id
    Long id;

    @Column(name = "description")
    String description;

    @Column(name = "assettype")
    String assetType;

    @Column(name = "assetgroup")
    String assetGroup;

    @Column(name = "status")
    String status;

    @Column(name = "region")
    String region;

    @Column(name = "facility")
    String facility;

    @Column(name = "property")
    String property;

    @Column(name = "location")
    String location;

}
