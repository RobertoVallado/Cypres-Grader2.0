# Automated Grading System with Cypress

This repository contains an automated grading system built with [Cypress](https://www.cypress.io/) and Docker, designed for grading student repositories.

## Table of Contents

- [Introduction](#introduction)
- [Setup](#setup)
- [Usage](#usage)
- [Prerequisites](#Prerequisites)
- [Configuration](#configuration)

## Introduction

This grading system automates the process of grading student repositories, making it efficient and consistent. It utilizes Cypress for writing end-to-end tests to evaluate the correctness of student code.

Is worth to mention that this repository works hand to hand with:

### Hosting-Git-Repositories-with-Nginx
You can fork or clone here:

```bash
https://github.com/RobertoVallado/Hosting-Git-Repositories-with-Nginx.git
```
Tests run from the websites hosted on docker.

## Setup

Before getting started, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (for Cypress)

## Usage

Usage:

./run_cygrader.sh script is designed for automated grading of student websites using the Cypress testing framework. It reads a list of student names and corresponding website ports from an input file, runs Cypress tests on each student's website, and stores the test results in individual text files.

## Prerequisites

Before using this script, make sure you have the following:

1. [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress): The script uses Cypress for running tests.
2. An input file named `ports.txt` containing a list of student names and their corresponding website ports in the format `STUDENT:PORTS`.

1. Clone or download this repository to your local machine.
2. Ensure that Cypress is installed and configured correctly.
3. Create an input file named `ports.txt` with the list of student names and website ports.
   Example `ports.txt` format:

4. Make the Bash script executable:
```bash
chmod +x run_cygrader.sh

```

## Configuration

Configuration:

- Modify to suit your marking needs.
