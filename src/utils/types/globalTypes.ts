import express from "express";

declare global {
  namespace Express {
    interface Response {
        status?: any
    }
  }
}