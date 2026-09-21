package ma.inetum.restonetbackend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name="SUGGESTIONS")

@NoArgsConstructor
@AllArgsConstructor
@Data

public class Suggestion implements Serializable {
    @Id
    @Column(name="SUGGESTION")
    private String suggestion;
    @Column(name = "EMAIL")
    private String email;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="SECTION")
    private Section section;

    @Column(name = "MESSAGES")
    private String messages;

    @ManyToOne
    @JoinColumn(name = "CLIENT")
    private  Client clientId;

//    @PrePersist
//    public void generateSuggestionId() {
//        if (this.suggestion == null || this.suggestion.isEmpty()) {
//            // Generate a default ID if none provided
//            this.suggestion = "SUG" + System.currentTimeMillis();
//        }
//    }
@Override
public String toString() {
    return "Suggestion{" +
            "suggestion='" + suggestion + '\'' +
            ", messages='" + messages + '\'' +
            ", email='" + email + '\'' +
            '}';
}
}
