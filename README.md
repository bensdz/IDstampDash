# IDstamp
<img src="https://i.imghippo.com/files/yxu1843.png" alt="" border="0" width="700px" align="center">
IDstamp is an intelligent identity verification system designed to facilitate secure, automated, and efficient client identity checks for businesses. Leveraging advanced technologies like facial recognition, Optical Character Recognition (OCR), and APIs, the platform enables companies to streamline verification processes while enhancing security and user experience.

This GitHub repository contains only the website dashboard of the project that has 3 parts (mobile, website dashboard, backend)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## Introduction

IDstamp addresses the growing need for robust identity verification in an increasingly digital world. The platform automates identity checks to reduce errors, improve operational efficiency, and bolster trust between businesses and clients.

### Key Objectives:

- Automate identity verification processes.
- Enhance data security and user privacy.
- Integrate seamlessly with business workflows via APIs.
- Support international compliance standards.

## Features

### User Features:

- Document and facial data submission.
- Real-time status updates for identity verification.
- Self-correction of extracted document data.

### Business Features:

- Client management (add, update, delete clients).
- Identity verification via advanced AI.
- API endpoints for seamless integration.
- Comprehensive reporting and analytics.

### Admin Features:

- Oversight of businesses and client data.
- Detailed statistics and audit logs.
- Advanced user and business management tools.

## Installation

### Clone the Repository:

```bash
git clone <repository-url>
```

### Install Dependencies:

```bash
npm install
```

### Configure the Database:

Set up the MySQL database using the schema provided.

### Run the Application:

```bash
npm start
```

## Usage

- Use the web dashboard to manage clients, review verification statuses, and access analytics.
- Provide clients with a mobile app to submit identity data securely.
- Leverage API integrations for real-time data synchronization.

## Technologies Used

### Languages:

- JavaScript: For backend and frontend development.
- Dart: For mobile app development.
- SQL: For database management.

### Frameworks and Libraries:

- Express.js: Backend web application framework.
- Flutter: Mobile app development framework.
- React: Frontend library for web dashboard.
- Prisma: ORM for database management.
- Material-UI: UI components for the web interface.
- Nodemailer: For email communication.
- Socket.IO: Real-time client-server communication.

### Cloud Services:

- Microsoft Azure AI Vision: OCR for document scanning.
- Amazon Rekognition: Facial recognition services.
- Aiven: Cloud-hosted MySQL for data synchronization.
- OpenSanctions: Database for sanction checks.

## Architecture

The system follows a three-tier architecture:

1. **Presentation Layer**: Mobile app and web dashboard for user interaction.
2. **Business Logic Layer**: Handles identity verification processes, data management, and API interactions.
3. **Data Layer**: MySQL database for secure data storage and retrieval.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Description of changes"
   ```

4. Push to the branch:

   ```bash
   git push origin feature-name
   ```

5. Create a pull request on GitHub.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
