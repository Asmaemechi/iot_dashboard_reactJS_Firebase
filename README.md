# iot_dashboard_reactJS_Firebase

Une interface web locale a été développée en **React.js** pour assurer la supervision du système même sans connexion Internet. Cette interface est hébergée localement sur le Raspberry Pi et reste accessible via un navigateur web.

Le dashboard local repose sur une architecture modulaire :

* Interface d’accueil et d’authentification (**Home**)
* Interface d’inscription des utilisateurs (**Register**)
* Tableau de bord principal dédié à la visualisation des données des capteurs

Cette approche garantit une utilisation simple, intuitive et autonome du système dans des environnements agricoles isolés.

---

## Interface d’accueil et d’authentification

![Interface d’accueil et d’authentification locale](images/home.png)

L’interface d’accueil constitue le point d’entrée de l’application. Elle permet à l’utilisateur de se connecter avec ses identifiants ou d’accéder à la page d’inscription avant d’entrer dans le tableau de bord principal.

---

## Cartes dynamiques des capteurs

![Cartes dynamiques affichant les valeurs instantanées des capteurs](images/values_updates_dashboard.png)

Le tableau de bord principal affiche les mesures des capteurs sous forme de cartes dynamiques avec icônes. Chaque carte présente la valeur instantanée d’un paramètre environnemental (température, humidité, luminosité, flamme et humidité du sol).

Les valeurs sont comparées à des **seuils prédéfinis** pour indiquer visuellement l’état du capteur (normal ou critique), facilitant ainsi la prise de décision rapide.

---

## Visualisation graphique en temps réel

![Graphique détaillé avec fonction de zoom](images/graphe.png)

Les données des capteurs sont représentées sous forme de graphiques en temps réel grâce à la bibliothèque `Recharts`. Les valeurs sont mises à jour automatiquement toutes les quelques secondes, simulant un flux de données temps réel.

Une fonctionnalité de **zoom en plein écran** permet d’analyser finement l’évolution temporelle des paramètres environnementaux.

---

## Gestion des alertes

![Panneau d’alertes générées lors du dépassement des seuils](images/alerte.png)

Lorsque les valeurs mesurées dépassent les seuils critiques, des alertes sont automatiquement générées et affichées dans un panneau dédié pour attirer immédiatement l’attention de l’utilisateur.

---

## Notification par courrier électronique

![Email de notification envoyé lors d’une alerte critique](images/email.png)

En complément de l’affichage local, le système envoie automatiquement des notifications par email en cas d’alerte critique, permettant d’informer l’utilisateur même lorsqu’il n’est pas connecté à l’interface web.

---

## Stockage et historique des données

![Historique des données et des alertes stocké dans Firebase Firestore](images/firebase.png)

Toutes les données mesurées ainsi que les alertes générées sont stockées dans la base de données **Firebase Firestore**, permettant la consultation de l’historique, la traçabilité des événements et l’exploitation ultérieure des données pour des analyses avancées.

---

## Démo Vidéo / GIF


![Démo du dashboard](assets/demo.gif)



---

## Fonctionnalités principales

* Supervision en temps réel des capteurs IoT
* Tableau de bord local et autonome
* Gestion automatique des alertes critiques
* Notifications par email
* Stockage et historique des données dans Firebase

---


## Conclusion

Le dashboard local constitue une solution fiable et autonome pour la supervision des paramètres agricoles, garantissant la continuité du service et la visualisation en temps réel, même dans des zones rurales sans Internet stable.
