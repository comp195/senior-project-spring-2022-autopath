using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[Flags]
public enum WallState
{
    //000 --> wall
    //1111 --> left right up down
    LEFT = 1, //0001
    RIGHT = 2, //0010
    UP = 4, //0100
    DOWN = 8, //1000
    
    VISITED  = 128,
    
}

public struct Position
{
    public int X;
    public int Y;
}

public struct Neighbour
{
    public Position Position;
    public WallState SharedWall;
}

public static class MazeGenerator 
{

    private static WallState GetOppwall(WallState wall)
    {
        switch (wall)
        {
            case WallState.RIGHT: return WallState.LEFT;
            case WallState.UP: return WallState.DOWN;
            case WallState.DOWN: return WallState.UP;
            case WallState.LEFT: return WallState.RIGHT;
            default: return WallState.LEFT;
        }
    }
    private static WallState[,] RecursiveApply(WallState[,] maze, int width, int height)
    {
        var randnum = new System.Random();
        var positionStack = new Stack<Position>();
        var position = new Position {X = randnum.Next(0, width), Y = randnum.Next(0, height)};
        maze[position.X, position.Y] |= WallState.VISITED;
        positionStack.Push(position);

        while (positionStack.Count > 0)
        {
            var current = positionStack.Pop();
            var neighbours = GetUnvisitedNeighbours(current, maze, width, height);
            if (neighbours.Count > 0)
            {
                positionStack.Push(current);
                var randIndex = randnum.Next(0, neighbours.Count);
                var randomNeigh = neighbours[randIndex];

                var nPosition = randomNeigh.Position;
                maze[current.X, current.Y] &= ~randomNeigh.SharedWall;
                maze[nPosition.X, nPosition.Y] &= ~GetOppwall(randomNeigh.SharedWall);


                maze[nPosition.X, nPosition.Y] |= WallState.VISITED;
                    
                    
                positionStack.Push(nPosition);
            }
        }
        
        
        return maze;
    }
    private static List<Neighbour> GetUnvisitedNeighbours(Position p, WallState[,] maze, int width, int height)
    {
        var list = new List<Neighbour>();
        if (p.X > 0) //Left
        {
            if (!maze[p.X - 1, p.Y].HasFlag(WallState.VISITED))
            {
                list.Add(new Neighbour
                {
                    Position = new Position()
                    {
                        X = p.X - 1,
                        Y = p.Y
                    },
                    SharedWall = WallState.LEFT
                });
            }
        }
        if (p.Y > 0) //down
        {
            if (!maze[p.X, p.Y-1].HasFlag(WallState.VISITED))
            {
                list.Add(new Neighbour
                {
                    Position = new Position()
                    {
                        X = p.X,
                        Y = p.Y-1
                    },
                    SharedWall = WallState.DOWN
                });
            }
        }
        if (p.Y < height - 1) //Up
        {
            if (!maze[p.X, p.Y+1].HasFlag(WallState.VISITED))
            {
                list.Add(new Neighbour
                {
                    Position = new Position()
                    {
                        X = p.X,
                        Y = p.Y+1
                    },
                    SharedWall = WallState.UP
                });
            }
        }
        if (p.X < width - 1) //Right
        {
            if (!maze[p.X + 1, p.Y].HasFlag(WallState.VISITED))
            {
                list.Add(new Neighbour
                {
                    Position = new Position()
                    {
                        X = p.X + 1,
                        Y = p.Y
                    },
                    SharedWall = WallState.RIGHT
                });
            }
        }

        return list;
    }
    public static WallState[,] Generate(int width, int height)
    {
        WallState[,] maze = new WallState[width, height];
        WallState initial = WallState.RIGHT | WallState.UP | WallState.DOWN | WallState.LEFT;

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                maze[i, j] = initial;
            }
        }

        return RecursiveApply(maze,width,height);
    }
}