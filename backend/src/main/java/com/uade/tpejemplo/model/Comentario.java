package com.uade.tpejemplo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "comentarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 1000)
    @Column(name = "contenido", nullable = false, length = 1000)
    private String contenido;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_entidad", nullable = false)
    private TipoEntidad tipoEntidad;

    @NotNull
    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dni_cliente")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_credito")
    private Credito credito;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cobranza")
    private Cobranza cobranza;
}
