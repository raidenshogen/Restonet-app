package ma.inetum.restonetbackend.services;

import lombok.Data;
import ma.inetum.restonetbackend.entities.Client;
import ma.inetum.restonetbackend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

@Data
public class ClientDetails implements UserDetails {

    private final Client client;
    //private final ClientRepository clientRepo;
    public ClientDetails(Client client) {
        this.client = client;
    }
    //@Autowired
    //    public ClientDetails(ClientRepository clientRepo) {
    //        this.clientRepo = clientRepo;
    //    }

    public String getMdpCrypte(){
        return client.getMdp_crypte();
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("CLIENT"));
    }
    @Override
    public String getPassword() {
        return client.getMotdepasseintranet();
    }

    @Override
    public String getUsername() {
        return client.getClient();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
