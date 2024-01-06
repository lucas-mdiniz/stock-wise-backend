import express from 'express';

export interface RoutesInterface{
  register(): void;
  router: express.Router;
}