$(document).ready(function(){

    $(".hero").hide().fadeIn(1000);

    $(".feature-card").hover(function(){

        $(this).toggleClass("shadow-lg");

    });

    $(".stat-card").hover(function(){

        $(this).toggleClass("shadow-lg");

    });

    $(".play-btn").click(function(){

        alert("Create an account first!");

    });

});