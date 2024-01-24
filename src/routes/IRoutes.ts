import express from 'express';

export interface IRoutes{
  register(): void;
  router: express.Router;
}