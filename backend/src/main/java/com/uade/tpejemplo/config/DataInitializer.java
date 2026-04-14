package com.uade.tpejemplo.config;

import com.uade.tpejemplo.model.Rol;
import com.uade.tpejemplo.model.Usuario;
import com.uade.tpejemplo.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        crearUsuarioSiNoExiste("admin", "password123", Rol.ADMIN);
        crearUsuarioSiNoExiste("juan",  "password123", Rol.USER);
        crearUsuarioSiNoExiste("maria", "password123", Rol.USER);
    }

    private void crearUsuarioSiNoExiste(String username, String password, Rol rol) {
        if (!usuarioRepository.existsByUsername(username)) {
            usuarioRepository.save(Usuario.builder()
                    .username(username)
                    .password(passwordEncoder.encode(password))
                    .rol(rol)
                    .build());
        }
    }
}
