package com.uade.tpejemplo.model;

import jakarta.persistence.*;
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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoEntidad tipoEntidad;

    @Column(nullable = false, length = 1000)
    private String contenido;

    @Column(nullable = false)
    private LocalDateTime fechaCreacion;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "credito_id")
    private Credito credito;

    @ManyToOne
    @JoinColumn(name = "cobranza_id")
    private Cobranza cobranza;

    // Getters
    public Long getId() { return id; }
    public TipoEntidad getTipoEntidad() { return tipoEntidad; }
    public String getContenido() { return contenido; }
    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public Usuario getUsuario() { return usuario; }
    public Cliente getCliente() { return cliente; }
    public Credito getCredito() { return credito; }
    public Cobranza getCobranza() { return cobranza; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTipoEntidad(TipoEntidad tipoEntidad) { this.tipoEntidad = tipoEntidad; }
    public void setContenido(String contenido) { this.contenido = contenido; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }
    public void setCredito(Credito credito) { this.credito = credito; }
    public void setCobranza(Cobranza cobranza) { this.cobranza = cobranza; }
}