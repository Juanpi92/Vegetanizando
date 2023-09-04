import React from 'react'
import './styles.css'
import about_media1 from '../../../public/imagenes/about/menu.avif'
import about_media2 from '../../../public/imagenes/about/mission.jpg'
import about_media3 from '../../../public/imagenes/about/restaurant.jpg'

export default function About() {
    return (
        <div className="about-container">
            <AboutArticle
                image={about_media3}
                title={"Compromisso com a Veganização"}
                text={"O Vegetanizando é um restaurante vegano comprometido com a causa ambiental e a alimentação saudável. Fundado em 2021 em Campinas, o restaurante se expandiu para o Rio de Janeiro e tem planos ambiciosos de abrir lojas em todo o Brasil."}
            />
            <AboutArticle
                image={about_media1}
                title={"Sabores Únicos e Cuidado com a Saúde"}
                text={"No Vegetanizando, os clientes podem desfrutar de um cardápio 100% natural e pratos exclusivos, como a Mini Carolina e aboborinha recheada. O restaurante preza pela saúde dos clientes, manipulando ingredientes com cuidado e valorizando profissionais altamente qualificados."}
            />
            <AboutArticle
                image={about_media2}
                title={"Levar o Veganismo a Todo o Brasil"}
                text={"A meta do Vegetanizando é estabelecer lojas em todo o país, tornando a alimentação vegana acessível a todos os brasileiros. Com foco na qualidade dos ingredientes e na preservação do meio ambiente, o restaurante busca se destacar na cena vegana do Brasil."}
            />
        </div>
    )
}

const AboutArticle = ({ image, title, text }) => {
    return (
        <article className='about-content'>
            <img src={image} alt="Imagem sobre nosso restaurante" className="article-media" />
            <div className="article-align-text">
                <p className="article-title">{title}</p>
                <p className="article-text">
                    {text}
                </p>
            </div>
        </article>

    )
}